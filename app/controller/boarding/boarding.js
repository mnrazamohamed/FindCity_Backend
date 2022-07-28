const boardingModel = require("../../model/boarding/boarding");
const { StatusCodes } = require("http-status-codes");

//create boarding
const createBoarding = async (req, res) => {
  const {
    boardingName,
    ownerName,
    gender,
    rooms,
    roomType,
    washroom,
    address,
    image,
    geoLocation,
    available,
    facilities,
  } = req.body;

  try {
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

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: newboarding,
    });
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      error: error,
    });
  }
};

//Get boarding
const getBoarding = async (req, res) => {
  try {
    const boarding = await boardingModel.find(req.query).sort("createdAt");
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      count: boarding.length,
      boarding: boarding,
    });
  } catch (error) {
    res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      error: error.message,
    });
  }
};

//Update boarding
const updateBoarding = async (req, res) => {
  const {
    boardingName,
    ownerName,
    gender,
    rooms,
    roomType,
    washroom,
    address,
    image,
    geoLocation,
    available,
    facilities,
    approval,
    _id,
  } = req.body;

  if (!_id) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      error: " boardingID required.",
    });
  }

  try {
    const boarding = await boardingModel.findByIdAndUpdate(
      { _id: _id },
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
        approval:approval,
      },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: "boarding updated successfully.",
    });
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      error: error.message,
    });
  }
};

// Delete boarding
const deleteBoarding = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      error: " boardingID required.",
    });
  }
  try {
    const boarding = await boardingModel.findByIdAndRemove({ _id: _id });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: "boarding deleted successfully.",
    });
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      error: error.message,
    });
  }
};

module.exports = {
  createBoarding,
  getBoarding,
  updateBoarding,
  deleteBoarding,
};
