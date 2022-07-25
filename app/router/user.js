const router = require("express").Router();
const auth = require("../middleware/auth");
const { signup, login } = require("../controller/user/auth");
const { findUsers, updateUser, deleteUser } = require("../controller/user/user");

router
    .route("/")
    .get(findUsers)
    .patch(updateUser)
    .delete(deleteUser)
    
router
    .route("/signup")
    .post(signup);

router
    .route("/login")
    .post(login);

module.exports = router;
