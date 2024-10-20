import db from "../models/models/index.js";
import paginate from "./plugins/paginate.plugin.js";
import { requestType, UserRole } from "../utils/enum.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const getAllRequests = async (filter, options) => {
    const { status, keyword } = filter; 
    const include = [{
        model: db.request,
        ...(status && { where: { status } })
    }];
    const searchFields = ['firstName', 'lastName'];
    const attributeInclude = ['id', 'firstName', 'lastName' ];
    const requests = await paginate(db.user, { keyword: keyword || '', role: UserRole.STAFF }, options, include, searchFields, attributeInclude);
    const requestResponse = requests.results.map(request => {
        const plainRequest = request.get({ plain: true });
        delete plainRequest.password;
        return plainRequest;
    });
    return {
        ...requests,
        results: requestResponse
    };
};

const updateStatusRequest = async (requestId, requestBody) => {
    const request = await db.request.findByPk(requestId);
    
    if (!request) throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');

    if ([requestType.ACCEPTED, requestType.REJECTED].includes(request.status)) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Request already ${request.status === requestType.ACCEPTED ? 'accepted' : 'rejected'}`);
    }

    await db.request.update({ status: requestBody.type }, { where: { id: requestId } });

    const updatedRequest = await db.request.findByPk(requestId);

    if (updatedRequest.status === requestType.ACCEPTED) {
        const { firstName, lastName, phoneNumber, dateOfBirth } = requestBody;
        await db.user.update(
            { firstName, lastName, phoneNumber, dateOfBirth }, 
            { where: { id: updatedRequest.userId } }
        );
    }
};


export default {
    getAllRequests,
    updateStatusRequest
};
  