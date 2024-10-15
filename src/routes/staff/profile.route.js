import express from "express";
import passport from "passport";
import staffController from "../../controllers/staff.controller.js";
import staffValidation from "../../validations/staff.validation.js";
import validate from "../../middlewares/validate.js";
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get(
  "/:id",
  validate(staffValidation.getStaffDetail),
  staffController.getStaffDetail
);

router.post(
  "/",
  validate(staffValidation.requestEditProfile),
  staffController.requestEditProfile
);

export default router;
