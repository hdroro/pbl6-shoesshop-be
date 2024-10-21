import Joi from "joi";

const getStockList = {
    query: Joi.object().keys({
        name: Joi.string().trim().max(50).optional(),
        size: Joi.number().optional(),
        sortBy: Joi.string().valid('totalImportQuantity', 'totalSoldQuantity', 'totalStockQuantity').default('totalStockQuantity').optional(),
        order: Joi.string().valid('asc', 'desc').default('desc').optional(),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(15)
    })
};

const getStockHistory = {
    params: Joi.object().keys({
        id: Joi.string().guid({ version: ['uuidv4'] }).required()
    }),
};

export default {
    getStockList,
    getStockHistory
}