const mongoose = require("mongoose");
const cities = require("../JSON/cities.json")


const citySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a location"],
    },
},
    {
        timestamps: false,
    }
);

const cityModel = mongoose.model("city", citySchema);

(async () => {
    const data = await cityModel.find({}).exec();
    if (data.length !== 0) return;
    await cityModel.insertMany(cities)
})();

module.exports = cityModel;
