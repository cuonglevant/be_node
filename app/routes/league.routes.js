import express from "express";
import {
  createLeague,
  getLeagues,
  getLeagueById,
  updateLeague,
  deleteLeague,
} from "../controllers/league.controller.js";

const router = express.Router();

router.post("/", createLeague);
router.get("/", getLeagues);
router.get("/:id", getLeagueById);
router.put("/:id", updateLeague);
router.delete("/:id", deleteLeague);

export default router;
