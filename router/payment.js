const router = require("express").Router();
const auth = require("../middleware/auth");
const { getPayments, makePayment } = require("../controller/payment/payment");
const { isHosteler, isAdminOrHosteler } = require("../middleware/userValidator");

router
  .route("/")
  .get(auth, isAdminOrHosteler, getPayments)
  .post(auth, isHosteler, makePayment);

module.exports = router;
