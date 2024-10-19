import Joi from 'joi';

const createCategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().trim(),
  }),
};

const getAllCategories = {
  query: Joi.object().keys({
    name: Joi.string().trim().max(30).optional(),
    sortBy: Joi.string().valid('name', 'createdAt', 'updatedAt').optional(),
    order: Joi.string().valid('asc', 'desc').optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  })
};

const deleteCategory = {
  params: Joi.object().keys({
    id: Joi.string().guid({ version: ['uuidv4'] }).required()
  }),
};

const editCategory = {
  params: Joi.object().keys({
    categoryId: Joi.string().guid({ version: ['uuidv4'] }).required()
  }),
  body: Joi.object().keys({
    name: Joi.string().trim().optional(),
    description: Joi.string().trim().optional()
  })
};


export default {
  createCategory,
  getAllCategories,
  deleteCategory,
  editCategory
}