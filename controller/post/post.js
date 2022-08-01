const postModel = require("../../model/post");
const { StatusCodes } = require("http-status-codes");

//create post
const createPost = async (req, res) => {
  const { name, from, gender, priceRange, roomLocation, roomType } = req.body;

  const newPost = await postModel.create({
    name: name,
    from: from,
    gender: gender,
    priceRange: priceRange,
    roomLocation: roomLocation,
    roomType: roomType,
  });

  return res.status(StatusCodes.OK).json({
    status: StatusCodes.CREATED,
    data: newPost,
  });

};

//Get post
const getPost = async (req, res) => {
  const post = await postModel.find(req.query).sort("createdAt");
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
  const { name, from, gender, priceRange, roomLocation, roomType, approval, postID, status } = req.body;

  if (!postID) throw new APIError("postID required", StatusCodes.NOT_FOUND)

  await postModel.findByIdAndUpdate(
    { _id: postID },
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
  const { postID } = req.body;
  if (!postID) throw new APIError("postID required", StatusCodes.NOT_FOUND)
  await postModel.findByIdAndRemove({ _id: postID });

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
