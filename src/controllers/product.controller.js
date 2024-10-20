import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { productServices } from '../services/index.js';
import pick from '../utils/pick.js';

const getAllProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'categoryId']);
  const options = pick(req.query, ['sortBy','order', 'limit', 'page']);
  const products = await productServices.getAllProductsByCondition({...filter, isDeleted: false}, options);
  res.status(httpStatus.OK).send(products);
});

const deleteProduct = catchAsync(async (req, res) => {
  await productServices.deleteProduct(req.params.productId);
  res.status(httpStatus.OK).send({
    message: `This product deleted successfully`,
  });
});

const getProductDetail = catchAsync(async (req, res) => {
  const products = await productServices.getProductDetail(req.params.productId);
  res.status(httpStatus.OK).send(products);
});

const getProductByName = catchAsync(async (req, res) => {
  const products = await productServices.getProductByName(req.query.name);
  res.status(httpStatus.OK).send(products);
});

const createNewProduct = catchAsync(async (req, res) => {
  await productServices.createNewProduct(req.body);
  res.status(httpStatus.OK).send({
    message: `This product created successfully`,
  });
});

const editProduct = catchAsync(async (req, res) => {
  await productServices.editProduct(req.params.productId, req.body);
  res.status(httpStatus.OK).send({
    message: `This product updated successfully`,
  });
});

export default {
  getAllProducts,
  deleteProduct,
  getProductDetail,
  getProductByName,
  createNewProduct,
  editProduct
};