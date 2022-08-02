const UserModel = require("../../model/user");
const { APIError } = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");



//Get users
const getUsers = async (req, res) => {
  
  let user = undefined
  Object.entries(req.params).length === 0 ?
    user = await UserModel.find(req.query).select('fullName email nic role mobile image').sort('_id') :
    user = await UserModel.findById(req.params).select('fullName email nic role mobile image').sort('_id')

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    count: user.length,
    user: user,
  });
};

//Update user
const updateUser = async (req, res) => {
  const { fullName, email, nic, mobile, password, address, image } = req.body;
  const { _id } = req.params;

  if (!_id) throw new APIError("userID required", StatusCodes.NOT_FOUND)
  const user = await UserModel.findById({ _id: _id })
  if (!user) throw new APIError("user not found", StatusCodes.NOT_FOUND)

  await UserModel.findByIdAndUpdate(
    { _id: _id },
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
  const { _id } = req.params;

  if (!_id) throw new APIError("userID required", StatusCodes.NOT_FOUND)
  const user = await UserModel.findById({ _id: _id })
  if (!user) throw new APIError("user not found", StatusCodes.NOT_FOUND)

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
