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
} from "../controllers/content.controller.js";
import { verifyToken } from "../middlewares/authJwt.js"; // Assuming you have an auth middleware

const router = express.Router();

router.post("/", verifyToken, createContent);
router.get("/", getContents);
router.get("/date/:date", getContentsByDate);
router.get("/:id", getContentById);
router.get("/slug/:slug", getContentBySlug); // Add this line
router.put("/:id", verifyToken, updateContent);
router.put("/slug/:slug", verifyToken, updateContentBySlug); // Add this line
router.delete("/:id", verifyToken, deleteContent);
router.delete("/slug/:slug", verifyToken, deleteContentBySlug); // Add this line
router.post("/view/:contentId", verifyToken, viewContent);

export default router;
