const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:User
  },
  firstname: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  availability: {
    type: String,
    required: true,
    trim: true
  },
  telephone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  
  create_date: {
    type: Date,
    default: Date.now
  },
  modify_date: {
    type: Date,
    default: Date.now
  }
});

profileSchema.set('toJSON', {
  getters: true,
  virtuals: true
})

module.exports = Profile = mongoose.model("profile", profileSchema);
