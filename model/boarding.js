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
    userID: {
      type: String,
      required: [true, "Please provide userID"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "Invalid gender, Please select male or female",
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
        values: ["Single", "Share", "Single/Share"],
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
      type: Array,
      required: false,
    },
    geoLocation: {
      type: Array,
      required: false,
    },
    available: {
      type: Boolean,
      required: true,
    },
    facilities: [{
      type: Array,
      enum: {
        values: ["Bed", "Mattress", "Fan", "Table", "Chair"],
        message: "Please select facilities",
      },
    }],
    approval: {
      type: Boolean,
      default: false,
    },
    deleted: {
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
