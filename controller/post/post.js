const postModel = require("../../model/post");
const { StatusCodes } = require("http-status-codes");
const { APIError } = require("../../middleware/errorHandler");

//create post
const createPost = async (req, res) => {
  const { name, from, gender, priceRange, roomLocation, roomType, userID } = req.body;

  const newPost = await postModel.create({
    name: name,
    from: from,
    gender: gender,
    priceRange: priceRange,
    roomLocation: roomLocation,
    roomType: roomType,
    userID: userID
  });

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.CREATED,
    data: newPost,
  });

};

//Get post
const getPost = async (req, res) => {
  let post = undefined
  Object.entries(req.params).length === 0 ?
    post = await postModel.find(req.query).select(req.query.select).sort(req.query.sort) :
    req.params._id ?
      post = await postModel.findById({_id:req.params._id}).select(req.query.select).sort(req.query.sort) :
      post = await postModel.find(req.params).select(req.query.select).sort(req.query.sort)

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
  const { name, from, gender, priceRange, roomLocation, roomType, approval, status } = req.body;
  const { _id } = req.params;

  if (!_id) throw new APIError("postID required", StatusCodes.NOT_FOUND)

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
    },
  );

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.OK,
    data: "post updated successfully.",
  });
};

// Delete post
const deletePost = async (req, res) => {
  const { _id } = req.params;
  if (!_id) throw new APIError("postID required", StatusCodes.NOT_FOUND)
  await postModel.findByIdAndRemove({ _id: _id });

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
