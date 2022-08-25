const router = require("express").Router();
const auth = require("../middleware/auth");
const { getCity,deleteCity } = require("../controller/city/city");
const { isHosteler } = require("../middleware/userValidator");

router
  .route("/")
  .get(auth, isHosteler, getCity)
  .delete(auth, isHosteler, deleteCity)

module.exports = router;
