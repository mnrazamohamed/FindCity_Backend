const router = require("express").Router();
const auth = require("../middleware/auth");
const { createPost, getPost, updatePost, deletePost, } = require("../controller/post/post");
const { isAdminOrHosteler, isHosteler, isAdminOrManagerOrHosteler } = require("../middleware/userValidator");

router
  .route("/")
  .get(auth, isAdminOrManagerOrHosteler, getPost)
  .post(auth, isHosteler, createPost)

router
  .route("/:userID")
  .get(auth, isHosteler, getPost)

router
  .route("/:userID/:_id")
  .get(auth, isHosteler, getPost)
  .patch(auth, isHosteler, updatePost)
  .delete(auth, isAdminOrHosteler, deletePost);

module.exports = router;
