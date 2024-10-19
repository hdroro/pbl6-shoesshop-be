import { Op } from "sequelize";
import db from "../models/models/index.js";
import paginate from './plugins/paginate.plugin.js';
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

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
  
  const orderDetail = db.order.findAll({
    include: [
      {
        model: db.user,
        attributes: ['firstName', 'lastName'],
      },
      {
        model: db.address,
        attributes: ['phoneNumberOrder', 'addressDetail'],
        include: [
          {
            model: db.province,
            attributes: ['name'],
          },
          {
            model: db.district,
            attributes: ['name']
          },
          {
            model: db.commune,
            attributes: ['name']
          }
        ]
      },
      {
        model: db.orderItem,
        attributes: ['quantity', 'sellingPrice']
      },
      {
        model: db.orderStatusHistory,
        attributes: ['changeDate']
      }
    ]
  });

  return orderDetail;
};


export default {
  getAllOrders,
  getOrderDetail
}
