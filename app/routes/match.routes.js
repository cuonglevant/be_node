import express from "express";
import {
  createMatch,
  getMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
} from "../controllers/match.controller.js";
import { verifyToken } from "../middlewares/authJwt.js"; // Assuming you have an auth middleware

const router = express.Router();

router.post("/", verifyToken, createMatch);
router.get("/", getMatches);
router.get("/:id", getMatchById);
router.put("/:id", verifyToken, updateMatch);
router.delete("/:id", verifyToken, deleteMatch);

export default router;
