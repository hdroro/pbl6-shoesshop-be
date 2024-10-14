import Joi from 'joi';

const getProducts = {
    query: Joi.object().keys({
        name: Joi.string().trim().max(30).optional(),
        categoryId: Joi.number().integer().positive().optional(),
        sortBy: Joi.string().valid('name', 'price', 'createdAt', 'updatedAt').optional(),
        order: Joi.string().valid('asc', 'desc').optional(),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(20)
    })
};

const deleteProduct = {
    params: Joi.object().keys({
        productId: Joi.string().guid({ version: ['uuidv4'] }).required()
    })
};

const getProductDetail = {
    params: Joi.object().keys({
        productId: Joi.string().guid({ version: ['uuidv4'] }).required()
    })
};

export default {
    getProducts,
    deleteProduct,
    getProductDetail
}