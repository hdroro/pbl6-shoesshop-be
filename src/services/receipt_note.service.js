import db from "../models/models/index.js";
import paginate from "./plugins/paginate.plugin.js";
import { AccountStatus, UserRole } from "../utils/enum.js";
import { Op } from "sequelize";
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import { v4 as UUIDV4 } from 'uuid';


const getAllReceiptNotes = async (filter, options) => {
    const include = [{
        model: db.user,
        attributes: ['firstName', 'lastName'],
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        { firstName: { [Op.iLike]: `%${filter.name?.trim() || ''}%` } },
                        { lastName: { [Op.iLike]: `%${filter.name?.trim() || ''}%` } }
                    ]
                },
                { role: UserRole.STAFF, status: AccountStatus.ACTIVE }
            ]
        }
    }];
    const searchFields = ['importDate'];
    const dateFilter = {};
    if (filter.fromDate) {
        dateFilter.fromDate = filter.fromDate;
    }
    if (filter.toDate) {
        dateFilter.toDate = filter.toDate;
        dateFilter.toDate.setHours(23, 59, 59, 999);
    }
    const receiptNotes = await paginate(db.receiptNote, dateFilter, options, include, searchFields);

    const receiptNoteIds = receiptNotes.results.map(r => r.id);
    const receiptNoteItemSums = await db.receiptNoteItem.findAll({
        where: { receiptNoteId: receiptNoteIds },
        attributes: [
            'receiptNoteId',
            [db.sequelize.fn('SUM', db.sequelize.col('quantity')), 'totalQuantity']
        ],
        group: ['receiptNoteId'],
        raw: true
    });

    const receiptNoteSumMap = receiptNoteItemSums.reduce((acc, item) => {
        acc[item.receiptNoteId] = item.totalQuantity;
        return acc;
    }, {});

    const resultsWithImportPrice = receiptNotes.results.map(receiptNote => ({
        ...receiptNote.toJSON(),
        firstName: receiptNote.user.firstName || null,
        lastName: receiptNote.user.lastName || null,
        user: undefined,
        totalQuantity: receiptNoteSumMap[receiptNote.id] || 0
    }));

    return {
        ...receiptNotes,
        results: resultsWithImportPrice
    };
};

const getReceiptNoteDetail = async (filter, options) => {
    const include = [
        {
            model: db.productAttribute,
            attributes: ['size', 'color', 'quantity'],
            include: {
                model: db.product,
                attributes: ['name'],
                required: false,
                where: filter.name ? { name: filter.name } : undefined
            },
            required: false
        }, {
            model: db.receiptNote,
            attributes: ['importDate'],
            where: filter.importDate ? { importDate: filter.importDate } : undefined,
            required: false
        }];

    const receiptNoteItems = await paginate(db.receiptNoteItem, { receiptNoteId: filter.id }, options, include)

    if (!receiptNoteItems) throw new ApiError(httpStatus.NOT_FOUND, 'Receipt note not found');

    const transformedResults = receiptNoteItems.results.map(result => {
        const resultJSON = result.toJSON();

        return {
            ...resultJSON,
            productName: resultJSON.productAttribute?.product?.name,
            importDate: resultJSON.receiptNote?.importDate,
            productAttribute: {
                ...resultJSON.productAttribute,
                product: undefined
            },
            receiptNote: undefined
        };
    });

    const output = {
        ...receiptNoteItems,
        results: transformedResults
    };

    return output;
};

const createReceiptNote = async (receiptNoteItemBody) => {
    const transaction = await db.sequelize.transaction();

    try {
        const receiptNote = await db.receiptNote.create({
            id: UUIDV4(),
            staffId: receiptNoteItemBody.staffId,
            importDate: new Date(receiptNoteItemBody.importDate)
        }, { transaction });

        if (!receiptNote) throw new ApiError(httpStatus.BAD_REQUEST, "Create new receiptNote not successful!");

        const validReceiptNoteItems = await Promise.all(
            receiptNoteItemBody.receiptNoteItems.map(async (item) => {
                const productAttribute = await db.productAttribute.findByPk(item.productAttributeId, { transaction });
                if (productAttribute) {
                    return {
                        ...item,
                        id: UUIDV4(),
                        receiptNoteId: receiptNote.id
                    };
                }
                return null;
            })
        );

        const filteredReceiptNoteItems = validReceiptNoteItems.filter(item => item !== null);

        if (filteredReceiptNoteItems.length > 0) {
            const receiptNoteItemsCreated = await db.receiptNoteItem.bulkCreate(filteredReceiptNoteItems, { transaction });

            await transaction.commit();

            return receiptNoteItemsCreated;
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, "No valid productAttributeIds found.");
        }
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


export default {
    getAllReceiptNotes,
    getReceiptNoteDetail,
    createReceiptNote
};
