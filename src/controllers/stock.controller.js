import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { stockServices } from '../services/index.js';
import pick from '../utils/pick.js';

const getStockList = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'size']);
  const options = pick(req.query, ['sortBy','order', 'limit', 'page']);
  const categories = await stockServices.getStockList(filter, options);
  res.status(httpStatus.OK).send(categories);
});

export default {
  getStockList,
};