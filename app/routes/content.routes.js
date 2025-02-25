import express from "express";
import {
  createContent,
  getContents,
  getContentsByDate,
  getContentById,
  getContentBySlug,
  updateContent,
  updateContentBySlug,
  deleteContent,
  deleteContentBySlug,
  viewContent,
  getTopContents,
} from "../controllers/content.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

const router = express.Router();

router.post("/", verifyToken, createContent);
router.get("/", getContents);
router.get("/date/:date", getContentsByDate);
router.get("/id/:id", getContentById);
router.get("/:slug", getContentBySlug);
router.put("/id/:id", verifyToken, updateContent);
router.put("/:slug", verifyToken, updateContentBySlug);
router.delete("/id/:id", verifyToken, deleteContent);
router.delete("/:slug", verifyToken, deleteContentBySlug);
router.post("/view/:contentId", verifyToken, viewContent);
router.get("/top/views", getTopContents);

export default router;
