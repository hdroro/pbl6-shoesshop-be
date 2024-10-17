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

router.delete(
    "/:id",
    validate(voucherValidation.deleteVoucher),
    voucherController.deleteVoucher
);

router.post(
    "/",
    validate(voucherValidation.createVoucher),
    voucherController.createVoucher
);

router.patch(
    "/:id",
    validate(voucherValidation.editVoucher),
    voucherController.editVoucher
);

export default router;
