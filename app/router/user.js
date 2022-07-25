const router = require("express").Router();
const auth = require("../middleware/auth");
const { signup, login } = require("../controller/user/auth");
const { findAllUsers, findOneUser, updateUser,
    deleteUser } = require("../controller/user/user");

router
    .route("/")
    .get(findAllUsers);

router
    .route("/:id")
    .get(findOneUser)
    .patch(updateUser)
    .delete(deleteUser);
    
router
    .route("/signup")
    .post(signup);

router
    .route("/login")
    .post(login);

module.exports = router;
