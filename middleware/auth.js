const { StatusCodes } = require("http-status-codes");
const JWT = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    throw new JWT.JsonWebTokenError(
      "No web token provided",
      StatusCodes.UNAUTHORIZED
    );

  try {
    const token = header.split(" ")[1];
    const { userID, role } = JWT.verify(token, process.env.JWT_SECRET);
    req.JWT_DATA = { userID, role };
    next();
  } catch (error) {
    throw new JWT.JsonWebTokenError(error.message, StatusCodes.UNAUTHORIZED);
  }
};

module.exports = authorization;
