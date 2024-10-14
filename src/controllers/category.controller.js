import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { categoryServices } from '../services/index.js';
import pick from '../utils/pick.js';

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryServices.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryServices.deleteCategory(req.params.categoryId);
  res.status(httpStatus.OK).send({
    message: `Category deleted successfully`,
  });
});
  
const getAllCategories = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy','order', 'limit', 'page']);
  const categories = await categoryServices.getAllCategories({...filter, isDeleted: false}, options);
  res.status(httpStatus.OK).send(categories);
});

const editCategory = catchAsync(async (req, res) => {
  const category = await categoryServices.editCategory(req.params.categoryId, req.body);
  res.status(httpStatus.OK).send(category);
});

export default {
  createCategory,
  deleteCategory,
  getAllCategories,
  editCategory
};
