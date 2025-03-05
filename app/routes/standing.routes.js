import express from "express";
import standingsController from "../controllers/standings.controller.js";

const router = express.Router();

router.post("/", standingsController.createStanding);

router.get("/", standingsController.getStandings);

router.get("/:id", standingsController.getStandingById);

router.get("/slug/:slug", standingsController.getStandingBySlug);

router.put("/:id", standingsController.updateStanding);

router.put("/slug/:slug", standingsController.updateStandingBySlug);

router.delete("/:id", standingsController.deleteStanding);

router.delete("/slug/:slug", standingsController.deleteStandingBySlug);

export default router;
