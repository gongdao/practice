const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateRegister, validateLogin } = require("../validate");
const { read, profileById, createProfile,updateProfile,deleteProfile, listProfile} = require("../controllers/profile");

router.route("/create").post(protect, createProfile);
router.route("/list").get(protect, listProfile);
router.route("/mid/:id")
  .get(protect, read)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);

router.param('id', profileById);


module.exports = router;