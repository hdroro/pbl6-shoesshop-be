import Joi from 'joi';
import { VoucherStatus, VoucherType } from '../utils/enum.js';

const getAllVouchers = {
    query: Joi.object().keys({
        name: Joi.string().max(50).optional(),
        type: Joi.string().valid(VoucherType.PERCENTAGE, VoucherType.PRICE).optional(),
        status: Joi.string().valid(VoucherStatus.UPCOMING, VoucherStatus.ACTIVE, VoucherStatus.EXPIRED, VoucherStatus.DELETED).optional(),
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(20)
    })
};

const getVoucherDetail = {
    params: Joi.object().keys({
        id: Joi.string().guid({ version: ['uuidv4'] }).required()
    }),
};

const deleteVoucher = {
    params: Joi.object().keys({
        id: Joi.string().guid({ version: ['uuidv4'] }).required()
    }),
};

const createVoucher = {
    body: Joi.object().keys({
        name: Joi.string().max(50).trim().required(),
        voucherType: Joi.string().valid(VoucherType.PERCENTAGE, VoucherType.PRICE).required(),
        minOrderPrice: Joi.number().required(),
        maxDiscountPrice: Joi.number().when('voucherType', {
            is: VoucherType.PERCENTAGE,
            then: Joi.required(),
            otherwise: Joi.forbidden()
        }),
        discountValue: Joi.number().required(),
        numberOfVouchers: Joi.number().required(),
        appliedDate: Joi.date().iso().required().custom((value, helpers) => {
            const currentDate = new Date();
            if (new Date(value) < currentDate) {
                return helpers.error('any.invalid', { message: 'Applied Date must be greater than or equal to the current date' });
            }
            return value;
        }),
        expiredDate: Joi.date().iso().required().custom((value, helpers) => {
            const appliedDate = helpers.state.ancestors[0].appliedDate;
            if (new Date(value) < new Date(appliedDate)) {
                return helpers.error('date.greater', { message: 'Expired Date must be greater than or equal to Applied Date' });
            }
            return value;
        })
    })
};

const editVoucher = {
    params: Joi.object().keys({
        id: Joi.string().guid({ version: ['uuidv4'] }).required()
    }),
    body: Joi.object().keys({
        name: Joi.string().max(50).trim().optional().allow(''),
        voucherType: Joi.string().valid(VoucherType.PERCENTAGE, VoucherType.PRICE).optional().allow(''),
        minOrderPrice: Joi.number().optional().allow(''),
        maxDiscountPrice: Joi.number().when('voucherType', {
            is: VoucherType.PERCENTAGE,
            then: Joi.required(),
            otherwise: Joi.forbidden()
        }).allow('').optional(),

        discountValue: Joi.number().allow('').optional(),
        numberOfVouchers: Joi.number().allow('').optional(),
        appliedDate: Joi.date().iso().allow('').optional().custom((value, helpers) => {
            const currentDate = new Date();
            if (new Date(value) < currentDate) {
                return helpers.error('any.invalid', { message: 'Applied Date must be greater than or equal to the current date' });
            }
            return value;
        }),
        expiredDate: Joi.date().iso().allow('').optional().custom((value, helpers) => {
            const appliedDate = helpers.state.ancestors[0].appliedDate;
            if (new Date(value) < new Date(appliedDate)) {
                return helpers.error('date.greater', { message: 'Expired Date must be greater than or equal to Applied Date' });
            }
            return value;
        })
    })
};




export default {
    getAllVouchers,
    getVoucherDetail,
    deleteVoucher,
    createVoucher,
    editVoucher
}
