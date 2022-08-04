const User = require("../../model/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { APIError } = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");
const { MongooseError } = require("mongoose");



//signup
const signup = async (req, res) => {
  const { fullName, email, nic, mobile, role, password } = req.body;

  const newUser = await User.create({
    fullName: fullName,
    email: email,
    nic: nic,
    mobile: mobile,
    role: role,
    password: password,
  }).catch(err => {
    if (err.code === 11000)
      throw new APIError(`Duplication error:  ${JSON.stringify(err.keyValue)}`, err.code)
    throw new APIError(err.message, err.code)
  })


  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: newUser,
  });
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) throw new APIError("Invalid email", StatusCodes.BAD_REQUEST)
  if (!password) throw new APIError("password required", StatusCodes.BAD_REQUEST)

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!(user && isPasswordCorrect)) throw new APIError("Incorrect password", StatusCodes.UNAUTHORIZED)

  const token = JWT.sign({ userID: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: { token: token, user: user },
  });

};

//refresh token
const refreshToken = async (req, res) => {
  try {
    // check token and get that expired token 
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    // if token not available send error
    if (!token) {
      throw new JWT.JsonWebTokenError("No web token provided", StatusCodes.UNAUTHORIZED);
    }

    // check correct token
    const { userID, role } = JWT.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });

    // generate new token
    const newToken = JWT.sign({ userID, role }, process.env.JWT_SECRET, { expiresIn: "10m" });

    //send logged in user details
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK, data: {
        userID, role, newToken
      }
    })

  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ data: error.message })
  }
}

module.exports = {
  signup,
  login,
  refreshToken
};
