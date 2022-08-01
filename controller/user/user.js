const UserModel = require("../../model/user");
const { APIError } = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");

//Get users
const getUsers = async (req, res) => {
  const user = await UserModel.find(req.query).select('fullName email nic role mobile').sort('_id');
  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    count: user.length,
    user: user,
  });
};

//Update user
const updateUser = async (req, res) => {
  const { fullName, email, nic, mobile, password, userID, address, image } = req.body;

  if (!userID) throw new APIError("userID required", StatusCodes.NOT_FOUND)

  await UserModel.findByIdAndUpdate(
    { _id: userID },
    {
      fullName: fullName,
      email: email,
      nic: nic,
      mobile: mobile,
      password: password,
      address: address,
      image: image
    },
  );

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "User updated successfully.",
  });

};

// Delete user
const deleteUser = async (req, res) => {
  const { userID } = req.body;

  if (!userID) throw new APIError("userID required", StatusCodes.NOT_FOUND)
  await UserModel.findByIdAndRemove({ _id: _id });

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "User deleted successfully.",
  });

};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
};
