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
  viewMatch,
  getTopMatches,
} from "../controllers/match.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = express.Router();

router.post("/", verifyToken, createMatch);
router.get("/", getMatches);
router.get("/date/:date", getMatchesByDate);
router.get("/id/:id", getMatchById);
router.get("/:slug", getMatchBySlug);
router.post("/view/:matchId", verifyToken, viewMatch);
router.put("/id/:id", verifyToken, updateMatch);
router.put("/:slug", verifyToken, updateMatchBySlug);
router.delete("/id/:id", verifyToken, deleteMatch);
router.delete("/:slug", verifyToken, deleteMatchBySlug);
router.get("/top/views", getTopMatches);

export default router;
