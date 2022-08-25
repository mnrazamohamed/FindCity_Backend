const { StatusCodes } = require("http-status-codes")

const notfound = (req, res) => {
    // res.status(StatusCodes.NOT_FOUND).json( {
    //     status : StatusCodes.NOT_FOUND,
    //     data : "Invalid path"
    // })
    res.send("<h1>Welcome</h1>")
}

module.exports = notfound