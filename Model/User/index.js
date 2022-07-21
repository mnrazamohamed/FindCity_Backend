const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    nic: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values : ['admin', 'manager','hosteler'],
        message : "invalid user role, expect manager or hosteler role"
      },
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: false,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  return next();
});

const userModel = mongoose.model("user", userSchema);

(async () => {
  const data = await userModel.find({}).exec();
  if (data.length !== 0) return;
  const raza = new userModel({
    fullName: "Raza Mohamed",
    email: "mnrazamohamed@gmail.com",
    nic: "199610800312",
    mobile: 777515721,
    role: "admin",
    password: "findCITY@123",
  });
  await raza.save();
})();


module.exports = userModel;
