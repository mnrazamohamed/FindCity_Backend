const postModel = require("../../model/post/post");
const { StatusCodes } = require("http-status-codes");

//create post
const createPost = async (req, res) => {
  const { name, from, gender, priceRange, roomLocation, roomType } =
    req.body;

  try {
    const newPost = await postModel.create({
      name: name,
      from: from,
      gender: gender,
      priceRange: priceRange,
      roomLocation: roomLocation,
      roomType: roomType,
    });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: newPost,
    });
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      error: error,
    });
  }
};

//Get post
const getPost = async (req, res) => {
  try {
    const post = await postModel.find(req.query).sort("createdAt");
    res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      count: post.length,
      post: post,
    });
  } catch (error) {
    res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      error: error.message,
    });
  }
};

//Update post
const updatePost = async (req, res) => {
  const { name, from, gender, priceRange, roomLocation, roomType, _id } =
    req.body;

  if (!_id) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      error: " postID required.",
    });
  }

  try {
    const post = await postModel.findByIdAndUpdate(
      { _id: _id },
      {
        name: name,
        from: from,
        gender: gender,
        priceRange: priceRange,
        roomLocation: roomLocation,
        roomType: roomType,
      },
      { new: true }
    );

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: "post updated successfully.",
    });
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      error: error.message,
    });
  }
};

// Delete post
const deletePost = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      error: " postID required.",
    });
  }
  try {
    const post = await postModel.findByIdAndRemove({ _id: _id });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: "post deleted successfully.",
    });
  } catch (error) {
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.BAD_REQUEST,
      error: error.message,
    });
  }
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
