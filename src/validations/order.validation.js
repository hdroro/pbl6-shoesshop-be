import Joi from "joi";

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

export default {
    getAllOrders,
    getOrderDetail
}