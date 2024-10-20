import express from "express";
import passport from "passport";
import validate from "../../middlewares/validate.js";
import { categoryValidation } from "../../validations/index.js";
import categoryController from "../../controllers/category.controller.js";
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get('/',
  validate(categoryValidation.getAllCategories),
  categoryController.getAllCategories
);

export default router;
