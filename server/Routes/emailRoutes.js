import express from "express";
import { scheduleEmail } from "../controller/emailController.js";

const router = express.Router();

router.post("/schedule", scheduleEmail);

export default router;
