import db from "../models/models/index.js";
import paginate from "./plugins/paginate.plugin.js";
import { UserRole } from "../utils/enum.js";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

const getAllCustomers = async (filter, options) => {
    const searchFields = ['firstName', 'lastName', 'email', 'phoneNumber'];
    const customers = await paginate(db.user, { ...filter, role: UserRole.CUSTOMER }, options, [], searchFields);
    const customerResponse = customers.results.map(customer => {
        const plainCustomer = customer.get({ plain: true });
        delete plainCustomer.password;
        return plainCustomer;
    });
    return {
        ...customers,
        results: customerResponse
    };
};

const getCustomerDetail = async (customerId) => {
    const userInfo = await db.user.findOne({
        where: {
            id: customerId,
            role: UserRole.CUSTOMER,
        },
        attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber'],
    });

    if (!userInfo) throw new ApiError(httpStatus.NOT_FOUND, "Customer not found");

    const userAddresses = await db.address.findAll({
        where: {
            userId: customerId
        },
        attributes: ['addressDetail', 'isDefault', 'phoneNumberOrder'],
        include: [
            {
                model: db.province,
                attributes: ['name'],
            },
            {
                model: db.district,
                attributes: ['name'],
            },
            {
                model: db.commune,
                attributes: ['name'],
            }
        ]
    });

    const formattedAddresses = userAddresses.map(address => ({
        addressDetail: address.addressDetail,
        isDefault: address.isDefault,
        phoneNumberOrder: address.phoneNumberOrder,
        provinceName: address?.province?.name.trim() || null,
        districtName: address?.district?.name.trim() || null,
        communeName: address?.commune?.name.trim() || null
    }));

    return {
        userInfo,
        addresses: formattedAddresses
    };
};


export default {
    getAllCustomers,
    getCustomerDetail
};
  