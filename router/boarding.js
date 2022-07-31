const router = require("express").Router();
const auth = require("../middleware/auth");
const {
    createBoarding,
    getBoarding,
    updateBoarding,
    deleteBoarding,
} = require("../controller/boarding/boarding");
const { isAdminOrManager, isManager, isAdminOrManagerOrHosteler} = require("../middleware/userValidator");

router
  .route("/")
  .get(auth,isAdminOrManagerOrHosteler, getBoarding)
  .post(auth, isManager, createBoarding)
  .patch(auth, isManager, updateBoarding)
  .delete(auth, isAdminOrManager, deleteBoarding);

module.exports = router;
