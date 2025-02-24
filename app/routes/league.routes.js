import express from "express";
import {
  createLeague,
  getLeagues,
  getLeagueById,
  updateLeague,
  deleteLeague,
} from "../controllers/league.controller.js";

const router = express.Router();

router.post("/leagues", createLeague);
router.get("/leagues", getLeagues);
router.get("/leagues/:id", getLeagueById);
router.put("/leagues/:id", updateLeague);
router.delete("/leagues/:id", deleteLeague);

export default router;
