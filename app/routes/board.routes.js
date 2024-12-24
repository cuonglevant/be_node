import express from "express";
import * as boardController from "../controllers/board.controller.js"; // Adjust the path as necessary

const router = express.Router();

export default function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    );
    next();
  });

  // Create a new board
  router.post("/boards", boardController.createBoard);

  // Get all boards
  router.get("/boards", boardController.getAllBoards);

  // Get a single board by ID
  router.get("/boards/:id", boardController.getBoardById);

  // Update a board
  router.put("/boards/:id", boardController.updateBoard);

  // Delete a board
  router.delete("/boards/:id", boardController.deleteBoard);

  app.use("/api", router);
}
