import express from "express";
import profileRoute from "./staff/profile.route.js";

const router = express.Router();

router.use("/", profileRoute);

export default router;