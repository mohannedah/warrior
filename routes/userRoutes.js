const express = require("express");
const router = express.Router();
const Product = require("../models/productModel");
const User = require("../models/userModel");
const authUser = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const userController = require("../Controllers/userController");

router.route("/login").post(userController.auth);
router.route("/register").post(userController.registerUser);
router
  .route("/profile")
  .get(authUser, userController.getUserProfile)
  .put(authUser, userController.updateUser);
router.route("/").get(authUser, admin, userController.getAllUsers);
router.route("/:id").delete(authUser, admin, userController.deleteUser);
router
  .route("/edit/:id")
  .put(authUser, admin, userController.updateUserFromAdmin);
router.route("/subscripe").put(authUser, userController.subscripe);

module.exports = router;
