import express from "express";
import validate from "../middlewares/validate.js";
import authController from "../controllers/auth.controller.js";
import { authValidation } from "../validations/index.js";

const router = express.Router();

// No authentication required
router.post(
  "/sign-up", 
  validate(authValidation.register), 
  authController.register
);

router.post(
  "/login",
  validate(authValidation.login),
  authController.login
);

router.post(
  "/logout",
  validate(authValidation.logout),
  authController.logout
);

router.post(
  "/refresh-token",
  validate(authValidation.refreshTokens),
  authController.refreshTokens
);

export default router;