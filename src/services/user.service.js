import httpStatus from 'http-status';
import db from "../models/models/index.js";
import ApiError from '../utils/ApiError.js';
import paginate from './plugins/paginate.plugin.js';
import { UUIDV4 } from 'sequelize';

const isEmailTaken = async (email, excludeUserId) => {
  const user = await db.user.findOne({
    where: {
      email: email,
      id: { [Sequelize.Op.ne]: excludeUserId }
    }
  });
  return !!user; 
};

const createUser = async (userBody) => {
  if (await isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const id = UUIDV4();
  return User.create({ id, ...userBody });
};

const queryUsers = async (filter, options) => {
  const users = await paginate('user', filter, options);
  return users;
};

const getUserById = async (id) => {
  return db.user.findByPk(id);
};

const getUserByEmail = async (email) => {
  return db.user.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
};
