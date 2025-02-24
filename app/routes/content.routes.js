import express from "express";
import {
  createContent,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
} from "../controllers/content.controller.js";

const router = express.Router();

router.post("/contents", createContent);
router.get("/contents", getContents);
router.get("/contents/:id", getContentById);
router.put("/contents/:id", updateContent);
router.delete("/contents/:id", deleteContent);

export default router;
