const router = require("express").Router();
const auth = require("../middleware/auth");
const { getPayments, makePayment, updatePayment } = require("../controller/payment/payment");
const { isHosteler, isAdmin } = require("../middleware/userValidator");

router
  .route("/")
  .get(auth, isAdmin, getPayments)
  .post(auth, isHosteler, makePayment);

router
  .route("/:_id")
  .get(auth, isHosteler, getPayments)
  .patch(auth, isHosteler, updatePayment);

module.exports = router;
