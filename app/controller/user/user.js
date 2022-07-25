const UserModel = require("../../model/user");
const { StatusCodes } = require("http-status-codes");

//Find all users
const findAllUsers = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      user: user,
    });
  } catch (error) {
    res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

//Find one user by id
const findOneUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      user: user,
    });
  } catch (error) {
    res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      message: error.message,
    });
  }
};

//Update user by id
const updateUser = async (req, res) => {
  if (!req.body) {
    res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      message: "Can't be empty.",
    });
  }

  const id = req.params.id;

  await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(StatusCodes.OK).json({
          status: StatusCodes.NOT_FOUND,
          message: "User not found.",
        });
      } else {
        res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: "User updated successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(StatusCodes.OK).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
    });
};

// Delete user by id
const deleteUser = async (req, res) => {
  await UserModel.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(StatusCodes.OK).json({
          status: StatusCodes.NOT_FOUND,
          message: "User not found.",
        });
      } else {
        res.status(StatusCodes.OK).json({
          status: StatusCodes.OK,
          message: "User deleted successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(StatusCodes.OK).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message,
      });
    });
};

module.exports = {
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
};
