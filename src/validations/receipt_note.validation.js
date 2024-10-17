import Joi from 'joi';
import { customValidation } from './index.js';

const getAllReceiptNotes = {
    query: Joi.object().keys({  
        name: Joi.string().max(50).trim().optional(),
        fromDate: Joi.date().iso().allow('').optional(),
        toDate: Joi.date().iso().allow('').optional().custom(customValidation.validateGreaterDate),
        sortBy: Joi.string().valid('importDate').optional(),
        order: Joi.string().valid('asc', 'desc').optional(),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(20)
    })
};

const getReceiptNoteDetail = {
    params: Joi.object().keys({
        id: Joi.string().guid({ version: ['uuidv4'] }).required()
    })
};

const createReceiptNote = {
    body: Joi.object().keys({
        staffId: Joi.string().guid({ version: ['uuidv4'] }).required(),
        importDate: Joi.date().iso().allow('').custom(customValidation.validateFutureDate).required(),
        receiptNoteItems: Joi.array().items(
            Joi.object().keys({
                productAttributeId: Joi.string().guid({ version: ['uuidv4'] }).required(),
                quantity: Joi.number().integer().required(),
                importPrice: Joi.number().integer().required()
            })
        ).min(1).required()
    })
};


export default {
    getAllReceiptNotes,
    getReceiptNoteDetail,
    createReceiptNote
}