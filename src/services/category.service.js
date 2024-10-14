import httpStatus from 'http-status';
import db from "../models/models/index.js";
import ApiError from '../utils/ApiError.js';
import paginate from './plugins/paginate.plugin.js';


const createCategory = async (categoryPayload) => {
    const category = await db.category.findOne({
        where: {
            name: categoryPayload.name,
            isDeleted: false
        }
    });
    if (!!category) throw new ApiError(httpStatus.BAD_REQUEST, "This category already taken");
    return db.category.create(categoryPayload);
};


const deleteCategory = async (categoryId) => {
    const category = await db.category.findByPk(categoryId);
    if (!category) throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    if (category.isDeleted) throw new ApiError(httpStatus.BAD_REQUEST, "Category already deleted");
    category.isDeleted = true;
    await category.save();
}

const getAllCategories = async (filter, options) => {
    const categories = await paginate(db.category, filter, options);
    return categories;
}

const editCategory = async (categoryId, categoryBody) => {
    const currentCategory = await db.category.findOne({ where: { id: categoryId } });

    if (!currentCategory) throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found');

    if (await db.category.findOne({ where: { name: categoryBody.name, isDeleted: false } })) throw new ApiError(httpStatus.BAD_REQUEST, 'Category already taken');
    const updatedCategory = await currentCategory.update(categoryBody);

    return updatedCategory;
};


export default {
    createCategory,
    deleteCategory,
    getAllCategories,
    editCategory
}
