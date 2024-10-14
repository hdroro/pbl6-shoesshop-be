import jwt from 'jsonwebtoken';
import moment from 'moment';
import config from '../config/config.js';
import db from '../models/models/index.js';
import tokenTypes from '../config/tokens.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';

const generateToken = (userInfo, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userInfo,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (refreshToken, userId, expires, type, blacklisted = false) => {
  const tokenDoc = await db.token.create({
    refreshToken,
    userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (refreshToken) => {
  let payload;
  try {
    payload = jwt.verify(refreshToken, config.jwt.secret);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired');
    }

    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
  }

  const tokenDoc = await db.token.findOne({
    where: {
      refreshToken, userId: payload.sub.id
    }
  });
  if (!tokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Token not found');
  }
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const { id, email, role } = user;
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken({ id, email, role } , accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken({ id, email, role } , refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, id, refreshTokenExpires);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const generateVerifyEmailToken = async (user) => {
  const expires = moment().add(config.jwt.verifyEmailExpirationMinutes, 'minutes');
  const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};

export default {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateVerifyEmailToken,
};
