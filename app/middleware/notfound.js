const { StatusCodes } = require("http-status-codes")

const notfound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).send("Invalid route")
}

module.exports = notfound