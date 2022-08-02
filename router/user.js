const router = require("express").Router();
const auth = require("../middleware/auth");
const { signup, login, refreshToken } = require("../controller/user/auth");
const { getUsers, updateUser, deleteUser } = require("../controller/user/user");
const { isAdminOrManagerOrHosteler, isAdmin } = require("../middleware/userValidator");
const { imageUploader } = require("../middleware/imageUploader");

router
  .route("/")
  .get(auth, isAdmin, getUsers)

router
  .route("/:_id")
  .get(auth, isAdminOrManagerOrHosteler, getUsers)
  .patch(auth, isAdminOrManagerOrHosteler, imageUploader, updateUser)
  .delete(auth, isAdminOrManagerOrHosteler, deleteUser);

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/refreshToken").post(refreshToken);

module.exports = router;
