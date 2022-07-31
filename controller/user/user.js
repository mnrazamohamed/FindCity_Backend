const UserModel = require("../../model/user");
const { StatusCodes } = require("http-status-codes");

//Get users
const getUsers = async (req, res) => {
  const user = await UserModel.find(req.query).select('fullName email nic mobile').sort('_id');
  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    count: user.length,
    user: user,
  });
};

//Update user
const updateUser = async (req, res) => {
  const { fullName, email, nic, mobile, password, UserID, address, image } = req.body;

  if (!UserID) throw new APIError("UserID required", StatusCodes.BAD_GATEWAY)

  await UserModel.findByIdAndUpdate(
    { _id: UserID },
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
  const { UserID } = req.body;

  if (!UserID) throw new APIError("UserID required", StatusCodes.BAD_GATEWAY)
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
