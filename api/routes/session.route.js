import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createSession, getPublicSessions,
  getMySessions,
  getMySessionById,
  saveDraftSession,
  publishSession } from "../controllers/session.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createSession);
router.get('/sessions', getPublicSessions); 
router.get('/my-sessions', verifyToken, getMySessions); 
router.get('/my-sessions/:id', verifyToken, getMySessionById);
router.post('/my-sessions/save-draft', verifyToken, saveDraftSession); 
router.post('/my-sessions/publish', verifyToken, publishSession);

export default router;