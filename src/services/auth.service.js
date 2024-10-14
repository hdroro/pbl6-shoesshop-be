import httpStatus from "http-status";
import db from "../models/models/index.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
import { v4 as UUIDV4 } from 'uuid';
import { tokenServices, userServices } from '../services/index.js';
dotenv.config();

const SALT_ROUNDS = 10;

const isPasswordMatch = async function (password, hashPassword) {
  return bcrypt.compare(password, hashPassword);
};

const createUser = async (userData) => {

  if (await db.user.findOne({ where: { email: userData.email }}) || await db.user.findOne({ where: { username: userData.username }})) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email or username already taken");
  };

  const savedUser = await db.user.create({
    ...userData,
    id: UUIDV4(),
    password: await bcrypt.hash(userData.password, SALT_ROUNDS),
    role: 'CUSTOMER'
  });

  return savedUser;
}

const login = async (userData) => {
  const foundUser = await db.user.findOne({
    where: { email: userData.email },
    attributes: [
      'id',
      'email',
      'role',
      'password',
      'firstName',
      'lastName'
    ],
  });

  if (!foundUser || !(await isPasswordMatch(userData.password, foundUser?.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect username or password");
  }
  const user = foundUser.get({ plain: true });
  delete user.password;

  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await db.token.findOne({
    where: {
      refreshToken
    }
  });

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.destroy();
};

const refreshAuth = async (refreshToken) => {
  const refreshTokenDoc = await tokenServices.verifyToken(refreshToken);
  const user = await userServices.getUserById(refreshTokenDoc.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
  }
  await refreshTokenDoc.destroy();
  return tokenServices.generateAuthTokens(user);
};

export default { createUser, login, logout, refreshAuth };
