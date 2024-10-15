import express from "express";

import categoryRoute from "./admin/category.route.js";
import productRoute from "./admin/product.route.js";
import customerRoute from "./staff/customer.route.js";
import requestRoute from "./admin/request.route.js";
import staffRoute from "./admin/staff.route.js";

const router = express.Router();

router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/customers", customerRoute);
router.use("/requests", requestRoute);
router.use("/staffs", staffRoute);

export default router;