const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  life : {
    type : Number,
    required : true,
    default : 10
  },
  userID: {
    type: String,
    required: [true, "Please provide UserID"],
    trim: true,
  },
  from: {
    type: String,
    required: [true, "Please provide where are you from"],
    minLength: 3,
    maxLength: 50,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "Invalid gender role, Please select male or female",
    },
    required: [true, "Please provide gender"],
  },
  priceRange: {
    type: String,
    enum: {
      values: [
        "2500 LKR - 4500 LKR",
        "4500 LKR - 6500 LKR",
        "6500 LKR - 8500 LKR",
        "8500 LKR - 10500 LKR",
      ],
      message: "select price range",
    },
    required: [true, "Please provide price range"],
  },
  roomLocation: {
    type: String,
    required: [true, "Please provide room location"],
    minLength: 3,
    maxLength: 50,
  },
  roomType: {
    type: String,
    required: [true, "Please provide room type"],
    enum: {
      values: ["single", "share", "single/share"],
      message: "Please select room type",
    },
  },
  approval: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  request: {
    type: Array,
    default: [],
  },


},
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
