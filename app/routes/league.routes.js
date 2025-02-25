import express from "express";
import {
  createLeague,
  getLeagues,
  getLeagueById,
  getLeagueBySlug,
  updateLeague,
  updateLeagueBySlug,
  deleteLeague,
  deleteLeagueBySlug,
} from "../controllers/league.controller.js";

const router = express.Router();

router.post("/", createLeague);
router.get("/", getLeagues);
router.get("/:id", getLeagueById);
router.get("/slug/:slug", getLeagueBySlug); // Add this line
router.put("/:id", updateLeague);
router.put("/slug/:slug", updateLeagueBySlug); // Add this line
router.delete("/:id", deleteLeague);
router.delete("/slug/:slug", deleteLeagueBySlug); // Add this line

export default router;
