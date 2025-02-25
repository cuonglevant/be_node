import express from "express";
import {
  createMatch,
  getMatches,
  getMatchById,
  getMatchBySlug,
  updateMatch,
  updateMatchBySlug,
  deleteMatch,
  deleteMatchBySlug,
  getMatchesByDate,
} from "../controllers/match.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = express.Router();

router.post("/", verifyToken, createMatch);
router.get("/", getMatches);
router.get("/:date", getMatchesByDate);
router.get("/:id", getMatchById);
router.get("/:slug", getMatchBySlug);
router.put("/:id", verifyToken, updateMatch);
router.put("/:slug", verifyToken, updateMatchBySlug);
router.delete("/:id", verifyToken, deleteMatch);
router.delete("/:slug", verifyToken, deleteMatchBySlug);

export default router;
