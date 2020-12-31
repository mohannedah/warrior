const express = require("express");
const router = express.Router();
const Address = require("../models/addressModel");
const addressController = require("../Controllers/addressController");
const auth = require("../middlewares/auth");
router.route("/:id").get(auth, addressController.getAddress);
router.route("/").post(auth, addressController.placeAddress);
module.exports = router;
