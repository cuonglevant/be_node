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
import { verifyToken } from "../middlewares/authJwt.js"; // Assuming you have an auth middleware

const router = express.Router();

router.post("/", verifyToken, createMatch);
router.get("/", getMatches);
router.get("/date/:date", getMatchesByDate);
router.get("/:id", getMatchById);
router.get("/slug/:slug", getMatchBySlug); // Add this line
router.put("/:id", verifyToken, updateMatch);
router.put("/slug/:slug", verifyToken, updateMatchBySlug); // Add this line
router.delete("/:id", verifyToken, deleteMatch);
router.delete("/slug/:slug", verifyToken, deleteMatchBySlug); // Add this line

export default router;
