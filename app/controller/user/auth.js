const User = require("../../model/user/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

//signup
const signup = async (req, res) => {
  const { fullName, email, nic, mobile, role, password } = req.body;
  
  try {

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

//login
const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
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
        role: user.role,
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

const refreshToken = async (req, res) => {
  try {
      // check token and get that expired token 
      const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
      // if token not available send error
      if (!token) {
          throw new JWT.JsonWebTokenError("No web token provided", StatusCodes.UNAUTHORIZED);
      }
      // check correct token
      const expiredPayload = JWT.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
      // generate new token
      let loginDetails = { userID: expiredPayload.userID, email: expiredPayload.email, role: expiredPayload.name };
      const newToken = JWT.sign(loginDetails, process.env.JWT_SECRET, { expiresIn: "1m" });
      loginDetails.token = newToken;

      //send logged in user details
      res.status(StatusCodes.OK).json({ status: StatusCodes.OK, data: loginDetails })

  } catch (error) {
      res.status(StatusCodes.UNAUTHORIZED).json({ data: error.message })
  }
}

module.exports = {
  signup,
  login,
  refreshToken
};
