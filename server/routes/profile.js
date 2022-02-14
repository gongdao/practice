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

const fs = require('fs');

const DIR = __dirname.substr(0, __dirname.length - 6) + 'upload\\';

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


// upload images
const multer = require('multer');

//multer options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/')
  },
  filename: (req, file, cb) => {
    cb(null, req.user.id + ".png")
  },
})

const upload = multer({storage: storage})

router.post('/upload', protect,  upload.single('file'), async (req, res) => {
  res.json({"success":true});
})
  
router.post('/delete', protect, async (req, res) => {
  const file = DIR + req.user.id + '.png'
  console.log({file})
  try {
      fs.unlinkSync(file);
      //file removed
    } catch(err) {
      console.log( file + " file doesn't exist");
    }
})
  
//end upload

module.exports = router;
