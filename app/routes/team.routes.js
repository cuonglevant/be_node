import express from "express";
import {
  createTeam,
  getTeams,
  getTeamById,
  getTeamBySlug,
  updateTeam,
  updateTeamBySlug,
  deleteTeam,
  deleteTeamBySlug,
} from "../controllers/team.controller.js";

const router = express.Router();

router.post("/", createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamById);
router.get("/:slug", getTeamBySlug);
router.put("/:id", updateTeam);
router.put("/:slug", updateTeamBySlug);
router.delete("/:id", deleteTeam);
router.delete("/:slug", deleteTeamBySlug);

export default router;
