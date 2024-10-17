import httpStatus from 'http-status';
import db from "../models/models/index.js";
import ApiError from '../utils/ApiError.js';
import paginate from './plugins/paginate.plugin.js';
import { VoucherStatus } from '../utils/enum.js';


const createVoucher = async (voucherPayload) => {
    return await db.voucher.create(voucherPayload);
};


const deleteVoucher = async (voucherId) => {
    const voucher = await db.voucher.findByPk(voucherId);
    if (!voucher) throw new ApiError(httpStatus.NOT_FOUND, "Voucher not found");
    if (voucher.isDeleted) throw new ApiError(httpStatus.BAD_REQUEST, "Voucher already deleted");

    if (new Date() >= new Date(voucher.appliedDate)) throw new ApiError(httpStatus.BAD_REQUEST, "Voucher can't be deleted because it has already been issued");
    voucher.isDeleted = true;
    await voucher.save();
}

const getAllVouchers = async (filter, options) => {
    const attributeInclude = ['id', 'name', 'isDeleted', 'appliedDate', 'expiredDate', 'voucherType'];
    const vouchers = await paginate(db.voucher, filter, options, [], [], attributeInclude);

    const currentDate = new Date();

    const updatedVouchers = vouchers.results.map(voucher => {
        let status = VoucherStatus.EXPIRED;
        const plainVoucher = voucher.get({ plain: true });
        
        if (plainVoucher.isDeleted) status = VoucherStatus.DELETED;
        else {
            const { appliedDate, expiredDate } = plainVoucher;
            if (currentDate < new Date(appliedDate)) {
                status = VoucherStatus.UPCOMING;
            } else if (currentDate >= new Date(appliedDate) && currentDate <= new Date(expiredDate)) {
                status = VoucherStatus.ACTIVE;
            }
        };

        return {
            ...plainVoucher,
            status
        };
    });

    return {
        ...vouchers,
        results: updatedVouchers
    };
};

const getVoucherDetail = async (voucherId) => {
    const voucher = await db.voucher.findByPk(voucherId);
    
    if (!voucher) throw new ApiError(httpStatus.NOT_FOUND, 'Voucher not found');
    return voucher;
};


const editVoucher = async (voucherId, voucherBody) => {
    const currentVoucher = await db.voucher.findOne({ where: { id: voucherId, isDeleted: false } });
    if (!currentVoucher) throw new ApiError(httpStatus.BAD_REQUEST, 'Voucher not found');
    
    if (new Date() >= new Date(currentVoucher.appliedDate)) throw new ApiError(httpStatus.BAD_REQUEST, "Voucher can't be edited because it has already been issued");
    await db.voucher.update(voucherBody, { where: { id: voucherId } });
};


export default {
    createVoucher,
    deleteVoucher,
    getAllVouchers,
    getVoucherDetail,
    editVoucher
}
