const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controller/post/post");

const {
  isAdminOrHosteler,
  isHosteler,
  isAdminOrManagerOrHosteler,
} = require("../middleware/userValidator");

router
  .route("/")
  .get(auth, isAdminOrManagerOrHosteler, getPost)
  .post(auth, isHosteler, createPost)
  .patch(auth, isHosteler, updatePost)
  .delete(auth, isAdminOrHosteler, deletePost);

module.exports = router;
