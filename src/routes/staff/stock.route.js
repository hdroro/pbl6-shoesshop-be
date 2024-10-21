import express from "express";
import passport from "passport";
import validate from "../../middlewares/validate.js";
import { stockValidation } from "../../validations/index.js";
import stockController from "../../controllers/stock.controller.js";
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get('/',
  validate(stockValidation.getStockList),
  stockController.getStockList
);

export default router;
