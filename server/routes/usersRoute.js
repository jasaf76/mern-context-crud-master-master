import express from "express";
import userControllers from "./../controllers/userControllers.js";

const router = express.Router();

//ROUTER UsenftsRouter
router
  .route("/")
  .get(userControllers.getAllUsers)
  .post(userControllers.createUsers);
router
  .route("/:id")
  .get(userControllers.getSingleUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser);

export default router;
