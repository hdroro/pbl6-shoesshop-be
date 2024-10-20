import Joi from "joi";
import customValidation from "./custom.validation.js";

const getAllOrders = {
    query: Joi.object().keys({
        name: Joi.string().trim().max(50).optional(),
        status: Joi.string().trim().optional(),
        sortBy: Joi.string().valid('finalPrice', 'orderDate').optional(),
        order: Joi.string().valid('asc', 'desc').optional(),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(20)
    })
};

const getOrderDetail = {
    params: Joi.object().keys({
        id: Joi.string().guid({ version: ['uuidv4'] }).required()
    }),
};

const getOrdersByCustomer = {
    params: Joi.object().keys({
        customerId: Joi.string().guid({ version: ['uuidv4'] }).required()
    }),
    query: Joi.object().keys({
        fromDate: Joi.date().iso().allow('').optional(),
        toDate: Joi.date().iso().allow('').optional().custom(customValidation.validateGreaterDate),
        sortBy: Joi.string().valid('createdAt', 'updatedAt').default('updatedAt'),
        order: Joi.string().valid('asc', 'desc').default('desc'),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(5)
    })
};

export default {
    getAllOrders,
    getOrderDetail,
    getOrdersByCustomer
}