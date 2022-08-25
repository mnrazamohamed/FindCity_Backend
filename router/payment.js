const router = require("express").Router();
const auth = require("../middleware/auth");
const { getPayments, makePayment, updatePayment } = require("../controller/payment/payment");
const { isHosteler, isAdminOrHosteler } = require("../middleware/userValidator");

router
  .route("/")
  .get(auth, isAdminOrHosteler, getPayments)
  .post(auth, isHosteler, makePayment);

router
  .route("/:_id")
  .patch(auth, isHosteler, updatePayment);

router
  .route("/:postID")
  .get(auth, isHosteler, getPayments)

module.exports = router;
