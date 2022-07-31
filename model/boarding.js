const mongoose = require("mongoose");

const boardingSchema = mongoose.Schema(
  {
    boardingName: {
      type: String,
      required: [true, "Please provide boarding name"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    ownerName: {
      type: String,
      required: [true, "Please provide owner name"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Invalid gender role, Please select male or female",
      },
      required: [true, "Please provide gender"],
    },
    rooms: {
      type: Number,
      required: [true, "Please provide number of rooms"],
    },
    roomType: {
      type: String,
      required: [true, "Please provide room type"],
      enum: {
        values: ["single", "share", "single/ share"],
        message: "select room type",
      },
    },
    washroom: {
      type: Number,
      required: [true, "Please provide number of washroom"],
    },
    address: {
      type: String,
      required: [true, "Please provide boarding address"],
      minLength: 10,
      maxLength: 100,
    },
    image: {
      type: String,
      required: false,
    },
    geoLocation: {
      type: String,
      required: false,
    },
    available: {
      type: String,
      enum: {
        values: ["yes", "no"],
        message: "Please select yes or no",
      },
      required: true,
    },
    facilities: [
      {
        type: String,
        enum: {
          values: ["bed", "mattress", "fan", "table", "chair"],
          message: "Please select facilities",
        },
      },
    ],
    approval:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

const boardingModel = mongoose.model("boarding", boardingSchema);

module.exports = boardingModel;
