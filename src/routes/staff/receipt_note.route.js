import express from "express";
import passport from "passport";
import receiptNoteController from "../../controllers/receipt_note.controller.js";
import receiptNoteValidation from "../../validations/receipt_note.validation.js";
import validate from "../../middlewares/validate.js";
const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.get(
  "/",
  validate(receiptNoteValidation.getAllReceiptNotes),
  receiptNoteController.getAllReceiptNotes
);

router.get(
  "/:id",
  validate(receiptNoteValidation.getReceiptNoteDetail),
  receiptNoteController.getReceiptNoteDetail
);

router.post(
  "/",
  validate(receiptNoteValidation.createReceiptNote),
  receiptNoteController.createNewReceiptNote
);

export default router;
