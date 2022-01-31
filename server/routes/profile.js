const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { validateRegister, validateLogin } = require("../validate");
const {
  read,
  profileByUserId,
  createProfile,
  updateProfile,
  deleteProfile,
  listProfile,
  getByEmail,
  profileByEmail
} = require("../controllers/profile");

router.route("/create").post(protect, createProfile);
router.route("/list").get(protect, listProfile);
router.route("/:email")
  .get(protect, getByEmail)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);
router.param("email", profileByEmail);
router
  .route("/mid/:id")
  .get(protect, read)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);
// This id is user id, not profile id
router.param("id", profileByUserId);

module.exports = router;
