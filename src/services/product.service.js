import paginate from './plugins/paginate.plugin.js';
import db from '../models/models/index.js';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';

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
                attributes: ['thumbnail', 'isPrimary']
            },
            {
                model: db.productAttribute,
                attributes: ['size', 'color', 'quantity'],
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
        thumbnailPrimary: thumbnails.find(thumbnail => thumbnail.isPrimary)?.thumbnail || null,
        thumbnailOther: thumbnails.filter(thumbnail => !thumbnail.isPrimary).map(thumbnail => thumbnail.thumbnail),
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

export default { getAllProductsByCondition, deleteProduct, getProductDetail };
