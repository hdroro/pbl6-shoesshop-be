import express from "express";

import categoryRoute from "./admin/category.route.js";
import productRoute from "./admin/product.route.js";
import customerRoute from "./admin/customer.route.js";
import requestRoute from "./admin/request.route.js";
import staffRoute from "./admin/staff.route.js";
import voucherRoute from "./admin/voucher.route.js";
import orderRoute from "./admin/order.route.js";
import receiptNoteRoute from "./admin/receipt_note.route.js";
import stockRoute from "./admin/stock.route.js";

import { isAdmin } from "../middlewares/authorization.js";
import passport from "passport";

const router = express.Router();
router.use(passport.authenticate("jwt", { session: false }));
router.use(isAdmin);

router.use("/stocks", stockRoute);
router.use("/vouchers", voucherRoute);
router.use("/receipt-note", receiptNoteRoute);
router.use("/orders", orderRoute);
router.use("/products", productRoute);
router.use("/categories", categoryRoute);
router.use("/customers", customerRoute);
router.use("/requests", requestRoute);
router.use("/staffs", staffRoute);

export default router;