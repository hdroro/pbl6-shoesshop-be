import Joi from 'joi';
import { AccountStatus } from '../utils/enum.js';

const getAllCustomers = {
    query: Joi.object().keys({
        keyword: Joi.string().max(50).optional(),
        status: Joi.string().valid(AccountStatus.ACTIVE, AccountStatus.INACTIVE).optional(),
        sortBy: Joi.string().valid('id', 'firstName', 'lastName', 'createdAt').optional(),
        order: Joi.string().valid('asc', 'desc').optional(),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(20)
    })
};

export default {
    getAllCustomers
}
