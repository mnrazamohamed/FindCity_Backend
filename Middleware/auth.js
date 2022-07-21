const { StatusCodes } = require("http-status-codes");
const JWT = require("jsonwebtoken");

const authorization = async (req, res, next) => {
    const header = req.headers.authorization
    if (!header || !header.startsWith("Bearer "))
        throw new JWT.JsonWebTokenError("No web token provided", StatusCodes.UNAUTHORIZED)
        
    try {
        const token = header.split(' ')[1]
        const { userID, role } =  JWT.verify(token, process.env.JWT_SECRET)
        const JWT_DATA = { userID, role }
        req.JWT_DATA = JWT_DATA
        next()
    } catch (error) {
        throw new JWT.JsonWebTokenError("Invalid token", StatusCodes.UNAUTHORIZED)
    }
}

module.exports = authorization;