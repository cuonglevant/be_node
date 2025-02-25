import express from "express";
import {
  createNation,
  getNations,
  getNationById,
  updateNation,
  deleteNation,
} from "../controllers/nation.controller.js";

const router = express.Router();

router.post("/", createNation);
router.get("/", getNations);
router.get("/:id", getNationById);
router.put("/:id", updateNation);
router.delete("/:id", deleteNation);

export default router;
