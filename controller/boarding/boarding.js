const boardingModel = require("../../model/boarding");
const userModel = require("../../model/user");
const { StatusCodes } = require("http-status-codes");
const { APIError } = require('../../middleware/errorHandler')


//create boarding
const createBoarding = async (req, res) => {
  //filtering incoming data
  const { boardingName, userID, gender, rooms, roomType, washroom, address, image, geoLocation, available, facilities, } = req.body;

  if (!userID) throw new APIError("userID required", StatusCodes.NOT_FOUND)
  const user = await userModel.findById({ _id: userID })
  if (!user) throw new APIError("user not found", StatusCodes.NOT_FOUND)

  const newboarding = await boardingModel.create({
    boardingName: boardingName,
    userID: userID,
    gender: gender,
    rooms: rooms,
    roomType: roomType,
    washroom: washroom,
    address: address,
    image: image,
    geoLocation: geoLocation,
    available: available,
    facilities: facilities,
  }).catch(err => {
    if (err.code === 11000)
      throw new APIError(`Duplication error:  ${JSON.stringify(err.keyValue)}`, err.code)
    throw new APIError(err.message, err.code)
  })

  //send response
  return res.status(StatusCodes.OK).json({
    status: StatusCodes.CREATED,
    data: newboarding,
  });

};

//Get boarding
const getBoarding = async (req, res) => {

  let boarding = undefined
  Object.entries(req.params).length === 0 ?
    boarding = await boardingModel.find(req.query).select(req.query.select).sort(req.query.sort) :
    boarding = await boardingModel.findOne(req.params).select(req.query.select).sort(req.query.sort)

  //send response
  if (boarding.length === 0)
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      data: "No boarding found",
    });

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {
      count: boarding.length,
      boarding: boarding,
    }
  });

};

//Update boarding
const updateBoarding = async (req, res) => {
  const { boardingName, gender, rooms, roomType, washroom, address, image, geoLocation, available, facilities, approval, boardingID, } = req.body;

  const { _id } = req.params;

  if (!_id) throw new APIError("boardingID required", StatusCodes.NOT_FOUND)
  const boarding = await boardingModel.findById({ _id: _id })
  if (!boarding) throw new APIError("boarding not found", StatusCodes.NOT_FOUND)


  await boardingModel.findByIdAndUpdate(
    { _id: _id },
    {
      boardingName: boardingName,
      gender: gender,
      rooms: rooms,
      roomType: roomType,
      washroom: washroom,
      address: address,
      image: image,
      geoLocation: geoLocation,
      available: available,
      facilities: facilities,
      approval: approval,
    }).catch(err => {
      if (err.code === 11000)
        throw new APIError(`Duplication error:  ${JSON.stringify(err.keyValue)}`, err.code)
      throw new APIError(err.message, err.code)
    })

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "boarding updated successfully.",
  });

};

// Delete boarding
const deleteBoarding = async (req, res) => {
  const { _id } = req.params;

  if (!_id) throw new APIError("boardingID required", StatusCodes.NOT_FOUND)
  const boarding = await boardingModel.findById({ _id: _id })
  if (!boarding) throw new APIError("boarding not found", StatusCodes.NOT_FOUND)

  await boardingModel.findByIdAndRemove({ _id: _id });

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "boarding deleted successfully.",
  });

};

module.exports = {
  createBoarding,
  getBoarding,
  updateBoarding,
  deleteBoarding,
};
