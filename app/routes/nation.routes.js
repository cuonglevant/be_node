import express from "express";
import {
  createNation,
  getNations,
  getNationById,
  getNationBySlug,
  updateNation,
  updateNationBySlug,
  deleteNation,
  deleteNationBySlug,
} from "../controllers/nation.controller.js";

const router = express.Router();

router.post("/", createNation);
router.get("/", getNations);
router.get("/id/:id", getNationById);
router.get("/:slug", getNationBySlug);
router.put("/id/:id", updateNation);
router.put("/:slug", updateNationBySlug);
router.delete("/id/:id", deleteNation);
router.delete("/:slug", deleteNationBySlug);

export default router;
