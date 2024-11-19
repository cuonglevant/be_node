import express from "express";
import { verifyToken, isAdmin, isModerator } from "../middlewares/authJwt.js"; // Adjust the path as necessary
import * as boardController from "../controllers/board.controller.js"; // Adjust the path as necessary

const router = express.Router();

export default function (app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Create a new board
  router.post("/boards", [verifyToken, isAdmin], boardController.createBoard);

  // Get all boards
  router.get("/boards", [verifyToken], boardController.getAllBoards);

  // Get a single board by ID
  router.get("/boards/:id", [verifyToken], boardController.getBoardById);

  // Update a board
  router.put(
    "/boards/:id",
    [verifyToken, isAdmin],
    boardController.updateBoard
  );

  // Delete a board
  router.delete(
    "/boards/:id",
    [verifyToken, isAdmin],
    boardController.deleteBoard
  );

  app.use("/api", router);
}
