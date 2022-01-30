const mongoose = require("mongoose");
const Profile = require("../models/Profile");

// CREATE
exports.createProfile = function (req, res, next) {
  var profile = new Profile(req.body);

  profile.save(function (err) {
    if (err) {
      return res.status(400).send({
        error: err,
        message: 'failed to create profile'
      });
    } else {
      res.status(201).json(profile);
    }
  });
};
//UPDATE
exports.updateProfile = function (req, res, next) {
  Profile.findByIdAndUpdate(req.profile._id, req.body, { new: true }, function (err, profile) {
    if (err) {
      return next(err);
    }
    res.json(profile);
  });
};
//GET
exports.read = function (req, res) {
  res.json(req.profile);
}
//Delete
exports.deleteProfile = function (req, res, next) {
  Profile.findByIdAndRemove(req.profile.id, req.body, function (err, profile) {
    if (err) {
      console.error("got error when delete db: " + err);
      return res.status(400).send({
        error: err,
        message:'failed to delete profile.'
      })
    }
    res.status(204).send({
      message:'Deleted a profile.'
    })
  })
}

exports.profileById = function (req, res, next, profileId) {
  console.log("getById");
  Profile.findOne({
    _id:profileId
  }, (err, profile) => {
    if (err) {
      return next(err);
    } else {
      if (profile) {
        console.log("Found the profile from db: " + profile);
      } else {
        console.log("The profile not found by is " + profileId);
        return res.status(404).json({ "code": 404, "message": "the profile " + profileId + " isnot found" });
      }
      req.profile = profile;
      next();
    }
  })
}
//GET all
exports.listProfile = function (req, res, next) {
  console.log("List profile..........")
  Profile.find({}, function (err, profileList) {
    //console.log(profileList);
    if (err) {
      return res.status(400).send({
        error: err,
        message: 'failed to query profiles'
      })
    } else {
      res.json(profileList);
    }
  });
};

