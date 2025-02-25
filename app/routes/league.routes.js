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
router.get("/id/:id", getLeagueById);
router.get("/:slug", getLeagueBySlug);
router.put("/id/:id", updateLeague);
router.put("/:slug", updateLeagueBySlug);
router.delete("/id/:id", deleteLeague);
router.delete("/:slug", deleteLeagueBySlug);

export default router;
