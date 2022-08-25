const cityModel = require("../../model/city");
const { StatusCodes } = require("http-status-codes");

//Get City
const getCity = async (req, res) => {
  city = await cityModel.find({})

  if (city.length === 0)
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      data: "No city found",
    });

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {
      count: city.length,
      city: city,
    }
  });
};

//delete city
const deleteCity = async (req, res) => {

  const City = await cityModel.deleteMany({})


  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "Cities were deleted successfully.",
  });
};

module.exports = {
  getCity,
  deleteCity
};
