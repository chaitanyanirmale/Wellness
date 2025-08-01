import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createSession } from "../controllers/session.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createSession);


export default router;