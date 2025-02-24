import express from "express";
import {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from "../controllers/player.controller.js";

const router = express.Router();

router.post("/players", createPlayer);
router.get("/players", getPlayers);
router.get("/players/:id", getPlayerById);
router.put("/players/:id", updatePlayer);
router.delete("/players/:id", deletePlayer);

export default router;
