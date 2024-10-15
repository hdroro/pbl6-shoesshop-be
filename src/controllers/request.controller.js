import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync.js';
import { requestServices } from '../services/index.js';
import pick from '../utils/pick.js';

const getAllRequests = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['keyword', 'status']);
    const options = pick(req.query, ['limit', 'page']);
    const requests = await requestServices.getAllRequests(filter, options);
    res.status(httpStatus.OK).send(requests);   
});

const updateStatusRequest = catchAsync(async (req, res) => {
    await requestServices.updateStatusRequest(req.params.requestId, req.body);
    res.status(httpStatus.OK).send({message: 'Request updated status successfully'});   
});

export default { getAllRequests, updateStatusRequest }