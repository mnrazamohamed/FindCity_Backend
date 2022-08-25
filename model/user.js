const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide name"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    nic: {
      type: String,
      required: [true, "Please provide nic"],
      minLength: 10,
      maxLength: 12,
      unique: true,
    },
    mobile: {
      type: Number,
      required: [true, "Please provide mobile number"],
      minLength: 9,
      maxLength: 9,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "manager", "hosteler"],
        message: "Invalid user role, Please select manager or hosteler",
      },
      required: [true, "Please provide role"],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
    },
    address: {
      type: String,
      required: false,
      minLength: 10,
      maxLength: 100,
    },
    image: {
      type: String,
      required: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    }
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

userSchema.pre('findOneAndUpdate', async function () {
  if (this._update.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(this._update.password, salt);
    this._update.password = hashedPassword;
  }
})

const userModel = mongoose.model("user", userSchema);

(async () => {
  const data = await userModel.find({}).exec();
  if (data.length !== 0) return;

  const admin1 = new userModel({
    fullName: "Raza Mohamed",
    email: "mnrazamohamed@gmail.com",
    nic: "199610800312",
    mobile: 777515721,
    role: "admin",
    password: "findCITY@123",
  });
  await admin1.save();

  const admin2 = new userModel({
    fullName: "Birunthan",
    email: "ubirunthan77@gmail.com",
    nic: "200018902024",
    mobile: 766807820,
    role: "admin",
    password: "findCITY@077",
  });
  await admin2.save();
})();

module.exports = userModel;
