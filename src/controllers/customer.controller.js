import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import pick from '../utils/pick.js';
import { customerServices } from '../services/index.js';
  
const getAllCustomers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['keyword', 'status']);
  const options = pick(req.query, ['sortBy','order', 'limit', 'page']);
  const customers = await customerServices.getAllCustomers(filter, options);
  res.status(httpStatus.OK).send(customers);
});

const getCustomerDetail = catchAsync(async (req, res) => {
  const customers = await customerServices.getCustomerDetail(req.params.customerId);
  res.status(httpStatus.OK).send(customers);
});

export default {
    getAllCustomers,
    getCustomerDetail
};