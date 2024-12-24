import express from "express";
import * as cardController from "../controllers/card.controller.js"; // Adjust the path as necessary

const router = express.Router();

export default function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    );
    next();
  });

  // Create a new card
  router.post("/cards", cardController.createCard);

  // Get all cards
  router.get("/cards", cardController.getAllCards);

  // Get a single card by ID
  router.get("/cards/:id", cardController.getCardById);

  // Update a card
  router.put("/cards/:id", cardController.updateCard);

  // Delete a card
  router.delete("/cards/:id", cardController.deleteCard);

  app.use("/api", router);
}
