import express from "express";
import profileRoute from "./staff/profile.route.js";
import receiptNoteRoute from "./staff/receipt_note.route.js";
import productRoute from "./staff/product.route.js";
import orderRoute from "./staff/order.route.js";
import { isStaff } from "../middlewares/authorization.js";
import passport from "passport";

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));
router.use(isStaff);

router.use("/orders", orderRoute );
router.use("/receipt-note", receiptNoteRoute);
router.use("/products", productRoute);
router.use("/", profileRoute);

export default router;