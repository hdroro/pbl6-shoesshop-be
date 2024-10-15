import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { voucherServices } from '../services/index.js';
import pick from '../utils/pick.js';

const getAllVouchers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'type', 'status']);
  const options = pick(req.query, ['limit', 'page']);
  const vouchers = await voucherServices.getAllVouchers(filter, options);
  res.status(httpStatus.OK).send(vouchers);
});

const getVoucherDetail = catchAsync(async (req, res) => {
  const vouchers = await voucherServices.getVoucherDetail(req.params.id);
  res.status(httpStatus.OK).send(vouchers);
});

const createVoucher = catchAsync(async (req, res) => {
  const category = await voucherServices.createVoucher(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const deleteVoucher = catchAsync(async (req, res) => {
  await voucherServices.deleteVoucher(req.params.id);
  res.status(httpStatus.OK).send({
    message: `Voucher deleted successfully`,
  });
});

const editVoucher = catchAsync(async (req, res) => {
  const category = await voucherServices.editVoucher(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    message: `Voucher updated successfully`,
  });
});

export default {
  getAllVouchers,
  getVoucherDetail,
  createVoucher,
  deleteVoucher,
  editVoucher
};
