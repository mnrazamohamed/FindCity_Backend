const User = require("../../model/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const signup = async (req, res) => {
  try {
    const { fullName, email, nic, mobile, role, password } = req.body;

    const newUser = new User({
      fullName: fullName,
      email: email,
      nic: nic,
      mobile: mobile,
      role: role,
      password: password,
    });

    await newUser.save();

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: newUser,
    });
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      error: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user)
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.NOT_FOUND,
        error: "Invalid email",
      });

    if (!password)
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.NOT_FOUND,
        error: "password required",
      });

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!(user && isPasswordCorrect))
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.BAD_REQUEST,
        error: "Incorrect password",
      });

    const token = JWT.sign(
      {
        userID: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: "15m",
      }
    );

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: { token: token, user: user },
    });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      error: error,
    });
  }
};

module.exports = {
  signup,
  login,
};
