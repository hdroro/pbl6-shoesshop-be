import db from "../models/models/index.js";
import paginate from "./plugins/paginate.plugin.js";
import { AccountStatus, requestType, UserRole } from "../utils/enum.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { v4 as UUIDV4 } from 'uuid';

const getAllStaffs = async (filter, options) => {
    const searchFields = ['firstName', 'lastName', 'email', 'phoneNumber'];
    const staffs = await paginate(db.user, { ...filter, role: UserRole.STAFF }, options, [], searchFields);
    const staffResponse = staffs.results.map(staff => {
        const plainStaff = staff.get({ plain: true });
        delete plainStaff.password;
        return plainStaff;
    });
    return {
        ...staffs,
        results: staffResponse
    };
};

const getStaffDetail = async (staffId) => {
    const staff = await db.user.findOne({
        where: {
            id: staffId,
            role: UserRole.STAFF 
        },
        attributes: {
            exclude: ['password', 'role']
        }
    });
    if (!staff) throw new ApiError(httpStatus.NOT_FOUND, 'Staff not found!');
    return staff;
};

const deleteStaff = async (staffId) => {
    const staff = await db.user.findOne({ where: { id: staffId, role: UserRole.STAFF }});
    if (!staff) throw new ApiError(httpStatus.NOT_FOUND, 'Staff not found!');
    if (staff.status === AccountStatus.DELETED) throw new ApiError(httpStatus.BAD_REQUEST, 'Staff already deleted');

    staff.status = AccountStatus.DELETED;
    await staff.save();
};

const requestEditProfile = async (staffBody) => {
    const staff = await db.user.findOne({ where: { id: staffBody.id, role: UserRole.STAFF, status: AccountStatus.ACTIVE }});
    if (!staff) throw new ApiError(httpStatus.NOT_FOUND, 'Staff not found!');

    const request = await db.request.findOne({ where: { userId: staffBody.id, status: requestType.PENDING }});
    if (request) throw new ApiError(httpStatus.BAD_REQUEST, 'Cannot request an edit when the latest request has not been processed')

    const requestSaved = await db.request.create({
        id: UUIDV4(),
        userId: staffBody.id,
        status: requestType.PENDING,
        ...staffBody
    });
    return requestSaved;
};

export default {
    getAllStaffs,
    getStaffDetail,
    deleteStaff,
    requestEditProfile
};
  