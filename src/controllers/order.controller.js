import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { orderServices } from '../services/index.js';
import pick from '../utils/pick.js';

const getAllOrders = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'status']);
  const options = pick(req.query, ['sortBy','order', 'limit', 'page']);
  const orders = await orderServices.getAllOrders(filter, options);
  res.status(httpStatus.OK).send(orders);
});


const getOrderDetail = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy','order', 'limit', 'page']);
  const orders = await orderServices.getOrderDetail(req.params.id, options);
  res.status(httpStatus.OK).send(orders);
});

export default {
  getAllOrders,
  getOrderDetail
};
