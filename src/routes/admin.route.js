import express from "express";

import categoryRoute from "./admin/category.route.js";
import productRoute from "./admin/product.route.js";
import customerRoute from "./staff/customer.route.js";
import requestRoute from "./admin/request.route.js";
import staffRoute from "./admin/staff.route.js";
import voucherRoute from "./admin/voucher.route.js";
import { isAdmin } from "../middlewares/authorization.js";
import passport from "passport";

const router = express.Router();
router.use(passport.authenticate("jwt", { session: false }));
router.use(isAdmin);

router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/customers", customerRoute);
router.use("/requests", requestRoute);
router.use("/staffs", staffRoute);
router.use("/vouchers", voucherRoute);

export default router;