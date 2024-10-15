import express from "express";
import passport from "passport";
const router = express.Router();
import staffController from "../../controllers/staff.controller.js";
import staffValidation from "../../validations/staff.validation.js";
import validate from "../../middlewares/validate.js";

router.use(passport.authenticate("jwt", { session: false }));

router.get(
    "/",
    validate(staffValidation.getAllStaffs),
    staffController.getAllStaffs
);

router.get(
    "/:id",
    validate(staffValidation.getStaffDetail),
    staffController.getStaffDetail
);

router.delete(
    "/:id",
    validate(staffValidation.deleteStaff),
    staffController.deleteStaff
);

router.patch(
    "/password",
    validate(staffValidation.resetPassword),
    staffController.resetPassword
);


export default router;
