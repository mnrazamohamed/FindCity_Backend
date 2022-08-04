const UserModel = require("../../model/user");
const { APIError } = require("../../middleware/errorHandler");
const { StatusCodes } = require("http-status-codes");



//Get users
const getUsers = async (req, res) => {

  let user = undefined
  Object.entries(req.params).length === 0 ?
    user = await UserModel.find(req.query).sort('_id') :
    user = await UserModel.findOne(req.params).sort('_id')

  if (user.length === 0)
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      data: "No user found",
    });

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {
      count: user.length,
      user: user,
    }
  });
};

//Update user
const updateUser = async (req, res) => {
  const { fullName, nic, mobile, password, address, image } = req.body;
  const { _id } = req.params;

  if (!_id) throw new APIError("userID required", StatusCodes.NOT_FOUND)
  const user = await UserModel.findById({ _id: _id })
  if (!user) throw new APIError("user not found", StatusCodes.NOT_FOUND)

  await UserModel.findByIdAndUpdate(
    { _id: _id },
    {
      fullName: fullName,
      nic: nic,
      mobile: mobile,
      password: password,
      address: address,
      image: image
    }).catch(err => {
      if (err.code === 11000)
        throw new APIError(`Duplication error:  ${JSON.stringify(err.keyValue)}`, err.code)
      throw new APIError(err.message, err.code)
    })

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
