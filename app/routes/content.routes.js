import express from "express";
import {
  createContent,
  viewContent,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
} from "../controllers/content.controller.js";
import { authJwt } from "../middlewares/index.js";

const router = express.Router();

router.post("/", authJwt.verifyToken, createContent);
router.post("/view/:contentId", authJwt.verifyToken, viewContent);
router.get("/", getContents);
router.get("/:id", getContentById);
router.put("/:id", updateContent);
router.delete("/:id", deleteContent);

export default router;
