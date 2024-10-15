import Joi from 'joi';

const phoneNumberPattern = new RegExp(/^[0-9]{10}$/);

const getRequests = {
    query: Joi.object().keys({
        status: Joi.string().trim().valid('PENDING', 'ACCEPTED', 'REJECTED').optional(),
        keyword: Joi.string().max(50).optional(),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(20)
    })
};

const updateStatusRequest = {
    params: Joi.object().keys({
        requestId: Joi.string().guid({ version: ['uuidv4'] }).required()
    }),
    body: Joi.object().keys({
        type: Joi.string().trim().valid('ACCEPTED', 'REJECTED').required(),
        username: Joi.string().trim().allow('').optional(),
        firstName: Joi.string().trim().allow('').optional(),
        lastName: Joi.string().trim().allow('').optional(),
        phoneNumber: Joi.string().pattern(phoneNumberPattern).optional(),
        dateOfBirth: Joi.date().iso().optional(),
    })
};

export default { getRequests, updateStatusRequest }