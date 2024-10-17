import express from "express";
import profileRoute from "./staff/profile.route.js";
import receiptNoteRoute from "./staff/receipt_note.route.js";
import productRoute from "./staff/product.route.js";

const router = express.Router();

router.use("/receipt-note", receiptNoteRoute);
router.use("/products", productRoute);
router.use("/", profileRoute);

export default router;