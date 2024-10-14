import Joi from 'joi';
import { Gender } from '../utils/enum.js'

const phoneNumberPattern = new RegExp(/^[0-9]{10}$/);
const passwordPattern = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?~`-])(?=.*[a-zA-Z]).{8,}$/);

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().valid(Gender.MALE, Gender.FEMALE).required(),
    dateOfBirth: Joi.date().iso().required(),
    password: Joi.string().pattern(passwordPattern).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  }),
}

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export default {
  register,
  login,
  refreshTokens,
  logout
};
