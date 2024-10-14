import express from "express";
import passport from "passport";
import validate from "../../middlewares/validate.js";
import { categoryValidation } from "../../validations/index.js";
import categoryController from "../../controllers/category.controller.js";
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.post(
  "/",
  validate(categoryValidation.createCategory),
  categoryController.createCategory
);

router.delete(
  "/:categoryId",
  categoryController.deleteCategory
);

router.get('/',
  validate(categoryValidation.getAllCategories),
  categoryController.getAllCategories
);

router.patch(
  "/:categoryId",
  validate(categoryValidation.editCategory),
  categoryController.editCategory
);

export default router;
