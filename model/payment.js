const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
    userID: {
      type: String,
      required: [true, "Please provide UserID"],
      trim: true,
    },
    postID: {
      type: String,
      required: false,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Please provide amount in LKR"],
    },
  },{
    timestamps: true,
  }
);

const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = paymentModel;
