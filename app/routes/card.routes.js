import express from "express";
import { verifyToken } from "../middlewares/authJwt.js"; // Adjust the path as necessary
import * as cardController from "../controllers/card.controller.js"; // Adjust the path as necessary

const router = express.Router();

export default function (app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Create a new card
  router.post("/cards", [verifyToken], cardController.createCard);

  // Get all cards
  router.get("/cards", [verifyToken], cardController.getAllCards);

  // Get a single card by ID
  router.get("/cards/:id", [verifyToken], cardController.getCardById);

  // Update a card
  router.put("/cards/:id", [verifyToken], cardController.updateCard);

  // Delete a card
  router.delete("/cards/:id", [verifyToken], cardController.deleteCard);

  app.use("/api", router);
}
