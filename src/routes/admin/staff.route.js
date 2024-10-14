import express from "express";
import passport from "passport"; 
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false })); 

export default router;
