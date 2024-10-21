import db from '../models/models/index.js';

const getReceiptNoteItems = async () => {
    return await db.receiptNoteItem.findAll({
        attributes: [
            [db.sequelize.col('receiptNoteItem.productAttributeId'), 'productAttributeId'],
            [db.sequelize.fn('SUM', db.sequelize.col('receiptNoteItem.quantity')), 'totalImportQuantity']
        ],
        include: [{
            model: db.productAttribute,
            attributes: ['id', 'size', 'color'],
            include: [{
                model: db.product,
                attributes: ['id', 'name'],
            }]
        }],
        group: [
            'receiptNoteItem.productAttributeId',
            'productAttribute.id',
            'productAttribute.size',
            'productAttribute.color',
            'productAttribute.product.id',
            'productAttribute.product.name'
        ],
        raw: true,
        nest: true
    });
};


const getOrderItems = async () => {
    return await db.orderItem.findAll({
        attributes: [
            'productAttributeId',
            [db.sequelize.fn('SUM', db.sequelize.col('orderItem.quantity')), 'totalSoldQuantity']
        ],
        group: ['productAttributeId'],
        raw: true
    });
};

const getStockList = async (filter, options) => {
    const receiptNoteItems = await getReceiptNoteItems();
    const orderItems = await getOrderItems();

    const orderItemMap = {};
    orderItems.forEach(orderItem => {
        orderItemMap[orderItem.productAttributeId] = parseInt(orderItem.totalSoldQuantity, 10) || 0;
    });

    const combinedResults = receiptNoteItems.map(item => {
        const totalImportQuantity = parseInt(item.totalImportQuantity, 10);
        const totalSoldQuantity = orderItemMap[item.productAttributeId] || 0;

        return {
            ...item,
            totalImportQuantity,
            totalSoldQuantity,
            totalStockQuantity: totalImportQuantity - totalSoldQuantity
        };
    });

    let filteredResults = combinedResults;

    if (filter.name) {
        filteredResults = filteredResults.filter(item => 
            item.productAttribute?.product?.name.toLowerCase().includes(filter.name.toLowerCase())
        );
    }

    if (filter.size) {
        filteredResults = filteredResults.filter(item => 
            item.productAttribute?.size === filter.size.toString()
        );
    }

    if (options.sortBy) {
        filteredResults.sort((a, b) => {
            const aValue = a[options.sortBy] || 0;
            const bValue = b[options.sortBy] || 0;

            return options.order === 'asc' ? aValue - bValue : bValue - aValue;
        });
    }

    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
    const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
    const offset = (page - 1) * limit;

    const totalResults = filteredResults.length;
    const totalPages = totalResults > 0 ? Math.ceil(totalResults / limit) : 0;

    const paginatedResults = filteredResults.slice(offset, offset + limit);

    return {
        results: paginatedResults,
        page: page,
        limit: limit,
        totalPages: totalPages > 0 ? totalPages : null,
        totalResults
    };
};


export default {
    getStockList
}