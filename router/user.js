const router = require("express").Router();
const auth = require("../middleware/auth");
const { signup, login, refreshToken } = require("../controller/user/auth");
const { getUsers, updateUser, deleteUser } = require("../controller/user/user");
const { isAdminOrManagerOrHosteler } = require("../middleware/userValidator");

router
  .route("/")
  .get(auth, isAdminOrManagerOrHosteler, getUsers)
  .patch(auth, isAdminOrManagerOrHosteler, updateUser)
  .delete(auth, isAdminOrManagerOrHosteler, deleteUser);

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/refreshToken").post(refreshToken);

module.exports = router;
