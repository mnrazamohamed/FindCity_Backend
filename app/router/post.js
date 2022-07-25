const router = require("express").Router();
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controller/post/post");

router
  .route("/")
  .get(getPost)
  .post(createPost)
  .patch(updatePost)
  .delete(deletePost);

module.exports = router;
