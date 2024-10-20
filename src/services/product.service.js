import paginate from './plugins/paginate.plugin.js';
import db from '../models/models/index.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
import { Op } from 'sequelize';
import { v4 as UUIDV4 } from 'uuid';

const getAllProductsByCondition = async (filter, options) => {
    const include = [{
        model: db.category,
        required: false,
        attributes: ['name']
    }];
    const products = await paginate(db.product, filter, options, include);
    const productResponse = products.results.map(item => {
        const plainItem = item.get({ plain: true });
        if (plainItem.category) {
            plainItem.categoryName = plainItem.category.name;
        }
        delete plainItem.category;
        return plainItem;
    });

    return {
        ...products,
        results: productResponse
    };
};

const deleteProduct = async (productId) => {
    const product = await db.product.findByPk(productId);

    if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found!');
    if (product.isDeleted) throw new ApiError(httpStatus.BAD_REQUEST, 'Product already deleted!');

    product.isDeleted = true;
    await product.save();
};

const getProductDetail = async (productId) => {
    const productDetail = await db.product.findOne({
        where: { id: productId, isDeleted: false },
        include: [
            {
                model: db.category,
                attributes: ['id', 'name'],
            },
            {
                model: db.thumbnail,
                attributes: ['id', 'thumbnail', 'isPrimary']
            },
            {
                model: db.productAttribute,
                attributes: ['id', 'size', 'color', 'quantity'],
                required: false,
                include: {
                    model: db.fluctuationPriceHistory,
                    attributes: ['originPrice', 'sellingPrice', 'changeDate']
                }
            }
        ],
    });

    if (!productDetail) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found!');

    const { category, thumbnails, productAttributes } = productDetail.get({ plain: true });

    const transformedProduct = {
        ...productDetail.get({ plain: true }),
        categoryName: category?.name || null,
        thumbnailPrimary: {
            id: thumbnails.find(thumbnail => thumbnail.isPrimary)?.id,
            thumbnail: thumbnails.find(thumbnail => thumbnail.isPrimary)?.thumbnail || null
        },
        thumbnailOther: thumbnails
            .filter(thumbnail => !thumbnail.isPrimary)
            .map(thumbnail => ({
                id: thumbnail.id,
                thumbnail: thumbnail.thumbnail
            })),
        productAttributes: productAttributes.map(attribute => {
            const priceHistory = attribute.fluctuationPriceHistories[0] || {};

            const transformedAttribute = {
                ...attribute,
                originPrice: priceHistory.originPrice || null,
                sellingPrice: priceHistory.sellingPrice || null,
                changeDate: priceHistory.changeDate || null
            };
            delete transformedAttribute.fluctuationPriceHistories;

            return transformedAttribute;
        })
    };

    delete transformedProduct.category;
    delete transformedProduct.thumbnails;

    return transformedProduct;
};


const getProductByName = async (productName) => {
    const product = await db.product.findAll({
        where: {
            name: { [Op.like]: `%${productName}%` },
            isDeleted: false
        },
        attributes: ['name'],
        include: {
            model: db.productAttribute,
            attributes: ['id', 'size', 'color', 'quantity'],
            where: { isDeleted: false },
            required: false
        }
    });

    if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'Product not found')

    return product;
};

const createNewProduct = async (productBody) => {
    const productExist = await db.product.findOne({ where: { name: productBody.name } });
    if (productExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Product name already taken');

    if (!await db.category.findByPk(productBody.categoryId)) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    };

    const transaction = await db.sequelize.transaction();
    try {
        const product = await db.product.create({
            id: UUIDV4(),
            name: productBody.name,
            target: productBody.target,
            description: productBody.description,
            categoryId: productBody.categoryId,
        }, { transaction });

        if (!product) throw new ApiError(httpStatus.BAD_REQUEST, "Create new product not successful!");

        const validProductItems = await Promise.all(
            productBody.listProductItems.map(async (item) => ({
                id: UUIDV4(),
                productId: product.id,
                size: item.size,
                color: item.color,
            }))
        );

        const validThumbnailItems = await Promise.all(
            productBody.thumbnails.map(async (item) => ({
                id: UUIDV4(),
                productId: product.id,
                thumbnail: item.thumbnail,
                isPrimary: item.isPrimary,
            }))
        );

        if (validProductItems.length > 0) {
            const createdProductAttributes = await db.productAttribute.bulkCreate(validProductItems, { transaction });

            const validPriceHistoryItems = createdProductAttributes.map((productAttribute, index) => ({
                id: UUIDV4(),
                productAttributeId: productAttribute.id,
                originPrice: productBody.listProductItems[index].originPrice,
                sellingPrice: productBody.listProductItems[index].sellingPrice,
                changeDate: new Date(),
            }));

            if (validPriceHistoryItems.length > 0) {
                await db.fluctuationPriceHistory.bulkCreate(validPriceHistoryItems, { transaction });
            }
        };

        if (validThumbnailItems.length > 0) {
            await db.thumbnail.bulkCreate(validThumbnailItems, { transaction });
        };

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};


const editProduct = async (productId, productBody) => {
    const productExist = await db.product.findOne({ where: { id: productId } });
    if (!productExist) throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found');

    if (productBody?.categoryId && !await db.category.findByPk(productBody.categoryId)) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
    };

    const transaction = await db.sequelize.transaction();
    try {
        await db.product.update({
            name: productBody.name,
            target: productBody.target,
            description: productBody.description,
            categoryId: productBody.categoryId
        }, { where: { id: productId }, transaction });

        const itemsToUpdate = [];
        const itemsToCreate = [];

        for (const item of productBody.listProductItems) {
            const existingProductAttribute = item?.id ? await db.productAttribute.findOne({ where: { id: item.id, productId } }) : null;
            
            if (existingProductAttribute) {
                itemsToUpdate.push({
                    ...item,
                    productId: productId,
                });
            } else {
                itemsToCreate.push({
                    id: UUIDV4(),
                    productId: productId,
                    size: item.size,
                    color: item.color,
                    originPrice: item.originPrice,
                    sellingPrice: item.sellingPrice,
                });
            }
        };

        if (itemsToUpdate.length > 0) {
            const updateQueries = itemsToUpdate.map(item => ({
                originPrice: item.originPrice,
                sellingPrice: item.sellingPrice,
                productAttributeId: item.id,
            }));
        
            if (updateQueries.length > 0) {
                const caseOriginPrice = updateQueries.map((item) => `WHEN "productAttributeId" = '${item.productAttributeId}' THEN ${item.originPrice}`).join(" ");
                const caseSellingPrice = updateQueries.map((item) => `WHEN "productAttributeId" = '${item.productAttributeId}' THEN ${item.sellingPrice}`).join(" ");
                const ids = updateQueries.map(item => `'${item.productAttributeId}'`).join(", ");
        
                const query = `
                    UPDATE fluctuation_price_histories
                    SET "originPrice" = CASE ${caseOriginPrice} END,
                        "sellingPrice" = CASE ${caseSellingPrice} END,
                        "changeDate" = NOW()
                    WHERE "productAttributeId" IN (${ids})
                    AND "productAttributeId" IS NOT NULL;
                `;
        
                await db.sequelize.query(query, { transaction });
            }
        };

        if (itemsToCreate.length > 0) {
            await db.productAttribute.bulkCreate(itemsToCreate, { transaction });
            
            const validPriceHistoryItemsForCreate = itemsToCreate.map(item => ({
                id: UUIDV4(),
                productAttributeId: item.id,
                originPrice: item.originPrice,
                sellingPrice: item.sellingPrice,
                changeDate: new Date()
            }));

            if (validPriceHistoryItemsForCreate.length > 0) {
                await db.fluctuationPriceHistory.bulkCreate(validPriceHistoryItemsForCreate, { transaction });
            };
        };

        if (productBody.thumbnails && productBody.thumbnails.length > 0) {
            const thumbnailsToUpdate = [];
            const thumbnailsToCreate = [];

            for (const item of productBody.thumbnails) {
                const existingThumbnail = item?.id ? await db.thumbnail.findOne({ where: { id: item.id, productId } }) : null;

                if (existingThumbnail) {
                    thumbnailsToUpdate.push({
                        ...item,
                        productId: productId,
                    });
                } else {
                    thumbnailsToCreate.push({
                        id: UUIDV4(),
                        productId: productId,
                        thumbnail: item.thumbnail,
                        isPrimary: item.isPrimary,
                    });
                }
            };

            if (thumbnailsToUpdate.length > 0) {
                await db.thumbnail.bulkCreate(thumbnailsToUpdate, {
                    updateOnDuplicate: ['thumbnail', 'isPrimary'],
                    transaction
                });
            }

            if (thumbnailsToCreate.length > 0) {
                await db.thumbnail.bulkCreate(thumbnailsToCreate, { transaction });
            }
        };

        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        throw error;
    };
};


export default { getAllProductsByCondition, deleteProduct, getProductDetail, getProductByName, createNewProduct, editProduct };
