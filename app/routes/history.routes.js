import express from "express";
import { verifyToken } from "../middlewares/authJwt.js"; // Adjust the path as necessary
import * as historyController from "../controllers/history.controller.js"; // Adjust the path as necessary

const router = express.Router();

export default function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    );
    next();
  });

  // Create a new history entry
  router.post("/histories", [verifyToken], historyController.createHistory);

  // Get all histories
  router.get("/histories", [verifyToken], historyController.getAllHistories);

  // Get a single history by ID
  router.get("/histories/:id", [verifyToken], historyController.getHistoryById);

  // Update a history entry
  router.put("/histories/:id", [verifyToken], historyController.updateHistory);

  // Delete a history entry
  router.delete(
    "/histories/:id",
    [verifyToken],
    historyController.deleteHistory
  );

  app.use("/api", router);
}
