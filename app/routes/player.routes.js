import express from "express";
import {
  createPlayer,
  getPlayers,
  getPlayerById,
  getPlayerBySlug,
  updatePlayer,
  updatePlayerBySlug,
  deletePlayer,
  deletePlayerBySlug,
} from "../controllers/player.controller.js";

const router = express.Router();

router.post("/", createPlayer);
router.get("/", getPlayers);
router.get("/:id", getPlayerById);
router.get("/slug/:slug", getPlayerBySlug); // Add this line
router.put("/:id", updatePlayer);
router.put("/slug/:slug", updatePlayerBySlug); // Add this line
router.delete("/:id", deletePlayer);
router.delete("/slug/:slug", deletePlayerBySlug); // Add this line

export default router;
