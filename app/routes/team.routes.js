import express from "express";
import {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} from "../controllers/team.controller.js";

const router = express.Router();

router.post("/teams", createTeam);
router.get("/teams", getTeams);
router.get("/teams/:id", getTeamById);
router.put("/teams/:id", updateTeam);
router.delete("/teams/:id", deleteTeam);

export default router;
