import { Op } from "sequelize";
import db from "../models/models/index.js";
import paginate from './plugins/paginate.plugin.js';
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { UserRole } from "../utils/enum.js";

const getAllOrders = async (filter, options) => {
  const include = [
    {
      model: db.user,
      attributes: [],
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${filter.name?.trim() || ''}%` } },
          { lastName: { [Op.iLike]: `%${filter.name?.trim() || ''}%` } }
        ]
      }
    },
  ];

  const attributeInclude = ['id', 'finalPrice', 'currentStatus', 'orderDate', 'createdAt',
    [
      db.sequelize.literal(`(
          SELECT COUNT(*)
          FROM "order_items"
          WHERE "order_items"."orderId" = "order".id
      )`),
      'productCount'
    ],
    [db.sequelize.col('user.firstName'), 'firstName'],
    [db.sequelize.col('user.lastName'), 'lastName']
  ];

  const orders = await paginate(db.order, filter?.status ? { currentStatus: filter?.status } : {}, options, include, [], attributeInclude);
  return orders;
};

const getOrderDetail = async (id, options) => {
  const order = await db.order.findByPk(id);
  if (!order) throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');

  const orderDetail = await db.order.findOne({
    attributes: ['orderDate', 'currentStatus', 'priceTotal', 'finalPrice', 'walletMoneyUsed'],
    where: { id },
    include: [
      {
        model: db.user,
        attributes: ['firstName', 'lastName'],
      },
      {
        model: db.address,
        attributes: ['phoneNumberOrder', 'addressDetail'],
        include: [
          { model: db.province, attributes: ['name'] },
          { model: db.district, attributes: ['name'] },
          { model: db.commune, attributes: ['name'] },
        ],
      },
      {
        model: db.orderItem,
        attributes: ['quantity', 'sellingPrice'],
        include: {
          model: db.productAttribute,
          attributes: ['size', 'color'],
          where: { isDeleted: false },
          include: { model: db.product, attributes: ['name'] },
        },
      },
      {
        model: db.orderStatusHistory,
        attributes: ['changeDate', 'status'],
        order: [['changeDate', 'DESC']],
      },
    ],
  });

  const response = {
    orderDate: orderDetail.orderDate,
    currentStatus: orderDetail.currentStatus,
    priceTotal: orderDetail.priceTotal,
    finalPrice: orderDetail.finalPrice,
    walletMoneyUsed: orderDetail.walletMoneyUsed,
    ...orderDetail.user && {
      firstName: orderDetail.user.firstName,
      lastName: orderDetail.user.lastName,
    },
    ...orderDetail.address && {
      phoneNumberOrder: orderDetail.address.phoneNumberOrder,
      addressDetail: orderDetail.address.addressDetail,
      provinceName: orderDetail.address.province.name,
      districtName: orderDetail.address.district.name,
      communeName: orderDetail.address.commune.name,
    },
    orderItems: orderDetail.orderItems.map(item => ({
      quantity: item.quantity,
      sellingPrice: item.sellingPrice,
      size: item.productAttribute.size,
      color: item.productAttribute.color,
      productName: item.productAttribute.product.name,
    })),
    orderStatusHistories: orderDetail.orderStatusHistories.map(history => ({
      changeDate: history.changeDate,
      status: history.status,
    })),
  };

  return response;
};

const convertOrderData = ({ results, page, limit, totalPages, totalResults }) => ({
  results: results.map(({ id, orderDate, priceTotal, finalPrice, currentStatus, createdAt, updatedAt, orderItems }) => ({
    id,
    orderDate,
    priceTotal,
    finalPrice,
    currentStatus,
    createdAt,
    updatedAt,
    orderItems: orderItems.map(({ quantity, productAttribute: { size, color, product: { name: productName } } }) => ({
      quantity,
      size,
      color,
      productName
    }))
  })),
  page,
  limit,
  totalPages,
  totalResults
});

const getOrdersByCustomer = async (filter, options, id) => {
  const customer = await db.user.findOne({
    where: {
      id: id.customerId,
      role: UserRole.CUSTOMER
    }
  });

  if (!customer) throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found!');

  const include = [
    {
      model: db.orderItem,
      attributes: ['quantity'],
      required: false,
      include: {
        model: db.productAttribute,
        attributes: ['id', 'size', 'color'],
        include: {
          model: db.product,
          attributes: ['name']
        }
      }
    }
  ];

  const dateFilter = {};
  if (filter.fromDate) {
    dateFilter.fromDate = filter.fromDate;
  }
  if (filter.toDate) {
    dateFilter.toDate = filter.toDate;
    dateFilter.toDate.setHours(23, 59, 59, 999);
  }

  const selectedAttributes = ['id', 'orderDate', 'priceTotal', 'finalPrice', 'currentStatus', 'createdAt', 'updatedAt'];
  const searchField = ['orderDate'];
  const orderData = await paginate(db.order, { ...dateFilter, userId: customer.id }, options, include, searchField, selectedAttributes);

  return convertOrderData(orderData);
};


export default {
  getAllOrders,
  getOrderDetail,
  getOrdersByCustomer
}
