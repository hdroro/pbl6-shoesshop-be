import Joi from 'joi';

const createUser = {
  body: Joi.object().keys({
    id: Joi.string().uuid().required(),
    username: Joi.string().required(),
    firstName: Joi.string(),
    lastName: Joi.string(),
    avatarLink: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.boolean().required(),
    roleId: Joi.string().uuid().required(),
  }),
};

export default {
    createUser
}