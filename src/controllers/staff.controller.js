import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import pick from '../utils/pick.js';
import { staffServices } from '../services/index.js';
  
const getStaffDetail = catchAsync(async (req, res) => {
  const { id } = req.params;
  const staffInfo = await staffServices.getStaffDetail(id);
  res.status(httpStatus.OK).send(staffInfo);
});

const getAllStaffs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['keyword', 'status']);
  const options = pick(req.query, ['sortBy','order', 'limit', 'page']);
  const staffs = await staffServices.getAllStaffs(filter, options);
  res.status(httpStatus.OK).send(staffs);
});

const deleteStaff = catchAsync(async (req, res) => {
  const staffs = await staffServices.deleteStaff(pick(req.params, ['id']));
  res.status(httpStatus.OK).send(staffs);
});

const requestEditProfile = catchAsync(async (req, res) => {
  const staffs = await staffServices.requestEditProfile(req.body);
  res.status(httpStatus.OK).send(staffs);
});

export default {
  getStaffDetail,
  getAllStaffs,
  deleteStaff,
  requestEditProfile
};