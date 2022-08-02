const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createBoarding,
  getBoarding,
  updateBoarding,
  deleteBoarding,
} = require("../controller/boarding/boarding");
const { isAdminOrManager, isManager, isAdminOrManagerOrHosteler, isAdminOrHosteler } = require("../middleware/userValidator");
const { imageUploader } = require("../middleware/imageUploader");

router
  .route("/")
  .get(auth, isAdminOrHosteler, getBoarding)
  .post(auth, isManager, imageUploader, createBoarding)
  
  router
  .route("/:_id")
  .get(auth, isManager, getBoarding)
  .patch(auth, isManager, imageUploader, updateBoarding)
  .delete(auth, isAdminOrManager, deleteBoarding);

module.exports = router;
