import express from "express";
import {
  createNation,
  getNations,
  getNationById,
  updateNation,
  deleteNation,
} from "../controllers/nation.controller.js";

const router = express.Router();

router.post("/nations", createNation);
router.get("/nations", getNations);
router.get("/nations/:id", getNationById);
router.put("/nations/:id", updateNation);
router.delete("/nations/:id", deleteNation);

export default router;
