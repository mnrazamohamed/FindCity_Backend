const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema(
    {
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
