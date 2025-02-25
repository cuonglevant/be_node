import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  updateCategory,
  updateCategoryBySlug,
  deleteCategory,
  deleteCategoryBySlug,
} from "../controllers/category.controller.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.get("/:slug", getCategoryBySlug);
router.put("/:id", updateCategory);
router.put("/:slug", updateCategoryBySlug);
router.delete("/:slug", deleteCategoryBySlug);
router.delete("/:id", deleteCategory);

export default router;
