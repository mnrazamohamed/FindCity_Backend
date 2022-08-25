const postModel = require("../../model/post");
const userModel = require("../../model/user");
const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../../middleware/errorHandler");

//create post
const createPost = async (req, res) => {
  const { name, from, gender, priceRange, roomLocation, roomType, userID } = req.body;

  if (!userID) throw new APIError("userID required", StatusCodes.NOT_FOUND)
  const user = await userModel.findById({ _id: userID })
  if (!user) throw new APIError("user not found", StatusCodes.NOT_FOUND)

  const newPost = await postModel.create({
    name: name,
    from: from,
    gender: gender,
    priceRange: priceRange,
    roomLocation: roomLocation,
    roomType: roomType,
    userID: userID
  }).catch(err => {
    if (err.code === 11000)
      throw new APIError(`Duplication error:  ${JSON.stringify(err.keyValue)}`, err.code)
    throw new APIError(err.message, err.code)
  })

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.CREATED,
    data: newPost,
  });

};

//Get post
const getPost = async (req, res) => {
  let post = undefined
  Object.entries(req.params).length === 0 ?
    post = await postModel.find({ ...req.query, deleted: false }).select(req.query.select).sort({ "createdAt": -1 }) :
    req.params._id ?
      post = await postModel.findOne({ ...req.query, _id: req.params._id, deleted: false }).select(req.query.select).sort({ "createdAt": -1 }) :
      post = await postModel.find({ ...req.query, userID: req.params.userID, deleted: false }).select(req.query.select).sort({ "createdAt": -1 })

  if (post.length === 0)
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.NOT_FOUND,
      data: "No post found",
    });

  res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: {
      count: post.length,
      post: post,
    }
  });


};

//Update post
const updatePost = async (req, res) => {
  const { name, from, gender, priceRange, roomLocation, roomType, approval, status, request } = req.body;
  const { _id } = req.params;

  if (!_id) throw new APIError("postID required", StatusCodes.NOT_FOUND)
  const post = await postModel.findById({ _id: _id })
  if (!post) throw new APIError("post not found", StatusCodes.NOT_FOUND)

  if (request && !(request instanceof Array))
    throw new APIError("request need to be array", StatusCodes.NOT_FOUND)

  await postModel.findByIdAndUpdate(
    { _id: _id },
    {
      name: name,
      from: from,
      gender: gender,
      priceRange: priceRange,
      roomLocation: roomLocation,
      roomType: roomType,
      approval: approval,
      status: status,
      request: request
    }).catch(err => {
      if (err.code === 11000)
        throw new APIError(`Duplication error:  ${JSON.stringify(err.keyValue)}`, err.code)
      throw new APIError(err.message, err.code)
    })

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "post updated successfully.",
  });
};

// lazy delete post // actually we are not removing from database
const deletePost = async (req, res) => {
  const { _id } = req.params;

  if (!_id) throw new APIError("postID required", StatusCodes.NOT_FOUND)
  const post = await postModel.findById({ _id: _id })
  if (!post) throw new APIError("post not found", StatusCodes.NOT_FOUND)

  await postModel.findByIdAndUpdate(
    { _id: _id },
    { deleted: true })

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "post deleted successfully.",
  });
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
};
