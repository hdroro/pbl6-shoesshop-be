import express from "express";
import passport from "passport"; 
import validate from "../../middlewares/validate.js";
import { requestValidation } from '../../validations/index.js';
import requestController from '../../controllers/request.controller.js'
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get(
    "/",
    validate(requestValidation.getRequests),
    requestController.getAllRequests
);

router.patch(
    "/:requestId",
    validate(requestValidation.updateStatusRequest),
    requestController.updateStatusRequest
);

export default router;
