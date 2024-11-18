const express = require("express");
const { verifyToken, isAdmin, isModerator } = require("../middlewares/authJwt"); // Adjust the path as necessary
const cardController = require("../controllers/card.controller"); // Adjust the path as necessary

const router = express.Router();

module.exports = function (app) {
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
  router.delete(
    "/cards/:id",
    [verifyToken, isAdmin],
    cardController.deleteCard
  );

  app.use("/api", router);
};
