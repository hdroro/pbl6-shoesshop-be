import express from "express";
import passport from "passport";
import orderController from "../../controllers/order.controller.js";
import orderValidation from "../../validations/order.validation.js";
import validate from "../../middlewares/validate.js";
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get(
  "/",
  validate(orderValidation.getAllOrders),
  orderController.getAllOrders
);

router.get(
  "/:id",
  validate(orderValidation.getOrderDetail),
  orderController.getOrderDetail
);


router.get(
  "/customer/:customerId",
  validate(orderValidation.getOrdersByCustomer),
  orderController.getOrdersByCustomer
);

export default router;
