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
router.get("/id/:id", getPlayerById);
router.get("/:slug", getPlayerBySlug);
router.put("/id/:id", updatePlayer);
router.put("/:slug", updatePlayerBySlug);
router.delete("/id/:id", deletePlayer);
router.delete("/:slug", deletePlayerBySlug);

export default router;
