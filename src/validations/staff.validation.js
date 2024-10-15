import Joi from 'joi';
import { AccountStatus, Gender } from '../utils/enum.js';

const phoneNumberPattern = new RegExp(/^[0-9]{10}$/);

const getAllStaffs = {
    query: Joi.object().keys({
        keyword: Joi.string().max(50).optional(),
        status: Joi.string().valid(AccountStatus.ACTIVE, AccountStatus.DELETED).optional(),
        sortBy: Joi.string().valid('id', 'firstName', 'lastName', 'createdAt').optional(),
        order: Joi.string().valid('asc', 'desc').optional(),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(20)
    })
};

const getStaffDetail = {
    params: Joi.object().keys({
        id: Joi.string().guid({ version: ['uuidv4'] }).required()
    }),
};

const deleteStaff = {
    params: Joi.object().keys({
        id: Joi.string().guid({ version: ['uuidv4'] }).required()
    }),
};

const requestEditProfile = {
    body: Joi.object().keys({
        id: Joi.string().guid({ version: ['uuidv4'] }).required(),
        username: Joi.string().trim().required(),
        firstName: Joi.string().trim().required(),
        lastName: Joi.string().trim().required(),
        phoneNumber: Joi.string().pattern(phoneNumberPattern).optional(),
        gender: Joi.string().valid(Gender.MALE, Gender.FEMALE).required(),
        dateOfBirth: Joi.date().iso().required(),
    })
};

const resetPassword = {
    query: Joi.object().keys({
        staffId: Joi.string().guid({ version: ['uuidv4'] }).required(),
        adminId: Joi.string().guid({ version: ['uuidv4'] }).required()
    }),
    body: Joi.object().keys({
        adminPassword: Joi.string().trim().required(),
        newPassword: Joi.string().trim().optional(),
    })
};

export default {
    getAllStaffs,
    getStaffDetail,
    deleteStaff,
    requestEditProfile,
    resetPassword
}
