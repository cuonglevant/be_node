import express from "express";
import { verifyToken, isAdmin, isModerator } from "../middlewares/authJwt.js"; // Adjust the path as necessary
import * as listController from "../controllers/list.controller.js"; // Adjust the path as necessary

const router = express.Router();

export default function (app) {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  // Create a new list
  router.post("/lists", [verifyToken, isAdmin], listController.createList);

  // Get all lists
  router.get("/lists", [verifyToken], listController.getAllLists);

  // Get a single list by ID
  router.get("/lists/:id", [verifyToken], listController.getListById);

  // Update a list
  router.put("/lists/:id", [verifyToken, isAdmin], listController.updateList);

  // Delete a list
  router.delete(
    "/lists/:id",
    [verifyToken, isAdmin],
    listController.deleteList
  );

  app.use("/api", router);
}
