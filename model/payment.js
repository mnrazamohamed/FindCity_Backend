const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, "Please provide UserID"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Please provide amount in LKR"],
    },
  },
  {
    timestamps: true,
  }
);

const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = paymentModel;
