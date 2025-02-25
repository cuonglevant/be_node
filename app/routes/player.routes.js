import express from "express";
import {
  createPlayer,
  getPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from "../controllers/player.controller.js";

const router = express.Router();

router.post("/", createPlayer);
router.get("/", getPlayers);
router.get("/:id", getPlayerById);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;
