const UserModel = require("../../model/user");
const { StatusCodes } = require("http-status-codes");

//Find all users
const findUsers = async (req, res) => {
  try {
    const user = await UserModel.find(req.query);
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      count: user.length,
      user: user,
    });
  } catch (error) {
    res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      error: error,
    });
  }
};

//Update user
const updateUser = async (req, res) => {
  const { fullName, email, nic, mobile, password, _id } = req.body;

  if (!_id) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
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
      },
      { useFindAndModify: false }
    );

    if (!user) {
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.NOT_FOUND,
        error: "User not found.",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: "User updated successfully.",
      });
    }
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
  }
};

// Delete user by id
const deleteUser = async (req, res) => {
  const { fullName, email, nic, mobile, role, password, _id } = req.body;

  if (!_id) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      error: " UserID required.",
    });
  }
  try {
    const user = await UserModel.findByIdAndRemove(
      { _id: _id },
      {
        fullName: fullName,
        email: email,
        nic: nic,
        mobile: mobile,
        role: role,
        password: password,
      }
    );

    if (!user) {
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.NOT_FOUND,
        message: "User not found.",
      });
    } else {
      return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: "User deleted successfully.",
      });
    }
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      error: error,
    });
  }
};

module.exports = {
  findUsers,
  updateUser,
  deleteUser,
};
