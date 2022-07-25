const router = require("express").Router();
const {
    createBoarding,
    getBoarding,
    updateBoarding,
    deleteBoarding,
} = require("../controller/boarding/boarding");

router
  .route("/")
  .get(getBoarding)
  .post(createBoarding)
  .patch(updateBoarding)
  .delete(deleteBoarding);

module.exports = router;
