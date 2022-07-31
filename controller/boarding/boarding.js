const boardingModel = require("../../model/boarding");
const { StatusCodes } = require("http-status-codes");
const { APIError } = require('../../middleware/errorHandler')


//create boarding
const createBoarding = async (req, res) => {
  //filtering incoming data
  const { boardingName, ownerName, gender, rooms, roomType, washroom, address, image, geoLocation, available, facilities, } = req.body;

  //create boarding
  const newboarding = await boardingModel.create({
    boardingName: boardingName,
    ownerName: ownerName,
    gender: gender,
    rooms: rooms,
    roomType: roomType,
    washroom: washroom,
    address: address,
    image: image,
    geoLocation: geoLocation,
    available: available,
    facilities: facilities,
  });

  //send response
  return res.status(StatusCodes.OK).json({
    status: StatusCodes.CREATED,
    data: newboarding,
  });

};

//Get boarding
const getBoarding = async (req, res) => {
  const boarding = await boardingModel.find(req.query).sort("createdAt");
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
  const { boardingName, ownerName, gender, rooms, roomType, washroom, address, image, geoLocation, available, facilities, approval, boardingID, } = req.body;

  if (!boardingID) throw new APIError("boardingID required", StatusCodes.NOT_FOUND)

  await boardingModel.findByIdAndUpdate(
    { _id: boardingID },
    {
      boardingName: boardingName,
      ownerName: ownerName,
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
    },
  );

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "boarding updated successfully.",
  });

};

// Delete boarding
const deleteBoarding = async (req, res) => {
  const { boardingID } = req.body;

  if (!boardingID) throw new APIError("boardingID required", StatusCodes.NOT_FOUND)

  await boardingModel.findByIdAndRemove({ _id: boardingID });

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
