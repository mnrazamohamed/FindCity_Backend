const { StatusCodes } = require("http-status-codes");
const User = require("../model/user");
const { APIError } = require("./errorHandler");

/*
A
H
M
A M H
A M
A H
H M
*/

const isAdmin = async (req, res, next) => {
    const { JWT_DATA: { userID, role }} = req
    const user = await User.findById({ _id: userID }).exec();
    if (!(user && ["admin"].includes(role)))
        throw new APIError("Not allowed", StatusCodes.FORBIDDEN)
    next()
}

const isManager = async (req, res, next) => {
    const { JWT_DATA: { userID, role } } = req
    const user = await User.findById({ _id: userID }).exec();
    if (!(user && ["manager"].includes(role)))
        throw new APIError("Not allowed", StatusCodes.FORBIDDEN)
    next()

}

const isHosteler = async (req, res, next) => {
    const { JWT_DATA: { userID, role } } = req
    const user = await User.findById({ _id: userID }).exec();
    if (!(user && ["hosteler"].includes(role)))
        throw new APIError("Not allowed", StatusCodes.FORBIDDEN)
    next()

}

const isAdminOrManagerOrHosteler = async (req, res, next) => {
    const { JWT_DATA: { userID, role }} = req
    const user = await User.findById({ _id: userID }).exec();
    if (!(user && ["admin","manager","hosteler"].includes(role)))
        throw new APIError("Not allowed", StatusCodes.FORBIDDEN)
    next()
}

const isAdminOrManager = async (req, res, next) => {
    const { JWT_DATA: { userID, role }} = req
    const user = await User.findById({ _id: userID }).exec();
    if (!(user && ["admin","manager"].includes(role)))
        throw new APIError("Not allowed", StatusCodes.FORBIDDEN)
    next()
}

const isAdminOrHosteler = async (req, res, next) => {
    const { JWT_DATA: { userID, role }} = req
    const user = await User.findById({ _id: userID }).exec();
    if (!(user && ["admin","hosteler"].includes(role)))
        throw new APIError("Not allowed", StatusCodes.FORBIDDEN)
    next()
}

const isManagerOrHosteler = async (req, res, next) => {
    const { JWT_DATA: { userID, role }} = req
    const user = await User.findById({ _id: userID }).exec();
    if (!(user && ["manager","hosteler"].includes(role)))
        throw new APIError("Not allowed", StatusCodes.FORBIDDEN)
    next()
}



module.exports = {
    isAdmin,
    isHosteler,
    isManager,
    isAdminOrManagerOrHosteler,
    isAdminOrManager,
    isAdminOrHosteler,
    isManagerOrHosteler,
}