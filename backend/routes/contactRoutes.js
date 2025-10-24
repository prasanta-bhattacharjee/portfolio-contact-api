import express from "express";
import {
  sendMessage,
  validateContact,
  limiter,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", limiter, validateContact, sendMessage);

export default router;
