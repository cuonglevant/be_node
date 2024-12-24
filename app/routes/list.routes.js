import express from "express";
import * as listController from "../controllers/list.controller.js"; // Adjust the path as necessary

const router = express.Router();

export default function (app) {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, Authorization"
    );
    next();
  });

  // Create a new list
  router.post("/lists", listController.createList);

  // Get all lists
  router.get("/lists", listController.getAllLists);

  // Get a single list by ID
  router.get("/lists/:id", listController.getListById);

  // Update a list
  router.put("/lists/:id", listController.updateList);

  // Delete a list
  router.delete("/lists/:id", listController.deleteList);

  app.use("/api", router);
}
