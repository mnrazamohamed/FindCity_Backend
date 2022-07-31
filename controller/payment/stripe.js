const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const { StatusCodes } = require("http-status-codes");
const { v4: uuidv4 } = require("uuid");
const { APIError } = require("../../middleware/errorHandler");

// Test Visa Card Number - 4242 4242 4242 4242
// Expire - any future month and year
// Code - any 3 digit number

const Stripe = async (req, res) => {
  const { stripeToken, amount } = req.body;

  if (!stripeToken)
    throw new APIError("Token is required", StatusCodes.BAD_REQUEST);

  try {
    const customer = await stripe.customers.create({
      email: stripeToken.email,
      payment_method: "pm_card_visa",
      invoice_settings: { default_payment_method: "pm_card_visa" },
    });

    const intent = await stripe.paymentIntents.create(
      {
        amount: amount * 100,
        currency: "USD",
        customer: customer.id,
        receipt_email: customer.email,
        payment_method_types: ["card"],
        payment_method: "pm_card_visa",
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    let intentConfirm = await stripe.paymentIntents.confirm(intent.id, {
      payment_method: intent.payment_method,
    });

    return intentConfirm;
  } catch (error) {
    throw new APIError(error.message, StatusCodes.BAD_GATEWAY);
  }
};

module.exports = { Stripe };
