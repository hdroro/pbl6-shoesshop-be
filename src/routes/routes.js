import express from "express";

import authRoute from "./auth.route.js";
import customerRoute from "./customer.route.js";
import adminRoute from "./admin.route.js";
import staffRoute from "./staff.route.js";

const router = express.Router();
router.use("/auth", authRoute);
router.use("/customer", customerRoute);
router.use("/admin", adminRoute);
router.use("/staff", staffRoute);

export default router;