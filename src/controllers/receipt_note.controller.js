import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import pick from '../utils/pick.js';
import { receiptNoteServices } from '../services/index.js';

const getAllReceiptNotes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'fromDate', 'toDate']);
  const options = pick(req.query, ['sortBy','order', 'limit', 'page']);
  const receiptNote = await receiptNoteServices.getAllReceiptNotes(filter, options);
  res.status(httpStatus.OK).send(receiptNote);
});

const getReceiptNoteDetail = catchAsync(async (req, res) => {
  const id = req.params.id;
  const filter = pick(req.query, [ 'name', 'importDate']);
  const options = pick(req.query, ['limit', 'page']);
  const receiptNoteDetail = await receiptNoteServices.getReceiptNoteDetail({ ...filter, id }, options);
  res.status(httpStatus.OK).send(receiptNoteDetail);
});

const createNewReceiptNote = catchAsync(async (req, res) => {
  const receiptNote = await receiptNoteServices.createReceiptNote(req.body);
  res.status(httpStatus.OK).send(receiptNote);
});

export default {
  getAllReceiptNotes,
  getReceiptNoteDetail,
  createNewReceiptNote
};