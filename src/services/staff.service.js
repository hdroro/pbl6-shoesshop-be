import db from "../models/models/index.js";
import paginate from "./plugins/paginate.plugin.js";
import { AccountStatus, passwordDefault, requestType, UserRole } from "../utils/enum.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { v4 as UUIDV4 } from 'uuid';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

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
    const staff = await db.user.findOne({ where: { id: staffId, role: UserRole.STAFF, status: { [Op.ne]:  AccountStatus.DELETED } }});
    if (!staff) throw new ApiError(httpStatus.NOT_FOUND, 'Staff not found!');
    if (staff.status === AccountStatus.DELETED) throw new ApiError(httpStatus.BAD_REQUEST, 'Staff already deleted');

    staff.status = AccountStatus.DELETED;
    await staff.save();
};

const requestEditProfile = async (staffBody) => {
    const staff = await db.user.findOne({ where: { id: staffBody.id, role: UserRole.STAFF, status: { [Op.ne]: AccountStatus.DELETED } } });
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

const resetPassword = async (groupId, staffBody) => {
    const staff = await db.user.findOne({ where: { id: groupId.staffId, role: UserRole.STAFF, status: AccountStatus.ACTIVE }});
    if (!staff) throw new ApiError(httpStatus.NOT_FOUND, 'Staff not found!');

    const admin = await db.user.findOne({ where: { id: groupId.adminId, role: UserRole.ADMIN }});
    if (!admin) throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found!');

    const isPasswordMatch = await bcrypt.compare(staffBody.adminPassword, admin.password);
    if (!isPasswordMatch) throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect password!');

    const newPassword = staffBody.newPassword ?? passwordDefault;
    const isPasswordNotChange = await bcrypt.compare(newPassword, staff.password);
    if (isPasswordNotChange) throw new ApiError(httpStatus.BAD_REQUEST, 'Make new password, please!');

    await db.user.update({
        password: await bcrypt.hash(newPassword, SALT_ROUNDS)
    }, { where: { id: groupId.staffId }});
};

export default {
    getAllStaffs,
    getStaffDetail,
    deleteStaff,
    requestEditProfile,
    resetPassword
};
  