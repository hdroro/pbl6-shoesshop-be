import Joi from 'joi';
import { ProductTarget } from '../utils/enum.js';

const getProducts = {
  query: Joi.object().keys({
    name: Joi.string().trim().max(30).optional(),
    categoryId: Joi.string().guid({ version: ['uuidv4'] }).optional(),
    sortBy: Joi.string().valid('name', 'price', 'createdAt', 'updatedAt').optional(),
    order: Joi.string().valid('asc', 'desc').optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(20)
  })
};

const getProductsByCategoryId = {
  params: Joi.object().keys({
    categoryId: Joi.string().guid({ version: ['uuidv4'] }).required()
  }),
  query: Joi.object().keys({
    name: Joi.string().trim().max(30).optional(),
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

const getProductByName = {
  query: Joi.object().keys({
    name: Joi.string().trim().required()
  })
};

const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
    target: Joi.string().trim().valid(ProductTarget.WOMEN, ProductTarget.MEN).required(),
    description: Joi.string().optional(),
    categoryId: Joi.string().guid({ version: ['uuidv4'] }).required(),
    listProductItems: Joi.array()
      .items(
        Joi.object().keys({
          size: Joi.string().trim().required(),
          color: Joi.string().trim().required(),
          originPrice: Joi.number().integer().required(),
          sellingPrice: Joi.number().integer().required(),
        })
      )
      .min(1)
      .required(),
    thumbnails: Joi.array()
      .items(
        Joi.object().keys({
          thumbnail: Joi.string().required(),
          isPrimary: Joi.boolean().required(),
        })
      )
      .min(1)
      .required()
      .custom((value, helpers) => {
        const primaryCount = value.filter((item) => item.isPrimary === true).length;
        if (primaryCount !== 1) {
          return helpers.message('There must be exactly one thumbnail with isPrimary: true');
        }
        return value;
      }),
    }),
};

const editProduct = {
  params: Joi.object().keys({
    productId: Joi.string().guid({ version: ['uuidv4'] }).required()
  }),
  body: Joi.object().keys({
    name: Joi.string().trim().optional(),
    target: Joi.string().trim().valid(ProductTarget.WOMEN, ProductTarget.MEN).optional(),
    description: Joi.string().optional(),
    categoryId: Joi.string().guid({ version: ['uuidv4'] }).optional(),
    listProductItems: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().guid({ version: ['uuidv4'] }).optional(),
          size: Joi.string().trim().optional(),
          color: Joi.string().trim().optional(),
          originPrice: Joi.number().integer().optional(),
          sellingPrice: Joi.number().integer().optional(),
        })
      )
      .min(1)
      .optional(),
    thumbnails: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().guid({ version: ['uuidv4'] }).optional(),
          thumbnail: Joi.string().optional(),
          isPrimary: Joi.boolean().optional(),
        })
      )
      .optional(),
    }),
};

export default {
  getProducts,
  getProductsByCategoryId,
  deleteProduct,
  getProductDetail,
  getProductByName,
  createProduct,
  editProduct
}