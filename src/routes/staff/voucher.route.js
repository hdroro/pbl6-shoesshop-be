import express from "express";
import passport from "passport"; 
import validate from "../../middlewares/validate.js";
import { voucherValidation } from '../../validations/index.js';
import voucherController from '../../controllers/voucher.controller.js'
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get(
    "/",
    validate(voucherValidation.getAllVouchers),
    voucherController.getAllVouchers
);

router.get(
    "/:id",
    validate(voucherValidation.getVoucherDetail),
    voucherController.getVoucherDetail
);

export default router;
