const UserModel = require("../../model/user/user");
const { StatusCodes } = require("http-status-codes");

//Get users
const getUsers = async (req, res) => {
  try {
    const user = await UserModel.find(req.query).select('fullName email nic mobile').sort('_id');
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      count: user.length,
      user: user,
    });
  } catch (error) {
    res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      error: error.message,
    });
  }
};

//Update user
const updateUser = async (req, res) => {
  const { fullName, email, nic, mobile, password, _id, address, image } = req.body;

  if (!_id) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      error: " UserID required.",
    });
  }

  try {
    const user = await UserModel.findByIdAndUpdate(
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
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: "User updated successfully.",
    });
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      error: error.message,
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      error: " UserID required.",
    });
  }
  try {
    const user = await UserModel.findByIdAndRemove({ _id: _id });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: "User deleted successfully.",
    });
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
  updateUser,
  deleteUser,
};
