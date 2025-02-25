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
router.get("/slug/:slug", getTeamBySlug); // Add this line
router.put("/:id", updateTeam);
router.put("/slug/:slug", updateTeamBySlug); // Add this line
router.delete("/:id", deleteTeam);
router.delete("/slug/:slug", deleteTeamBySlug); // Add this line

export default router;
