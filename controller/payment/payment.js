const { StatusCodes } = require('http-status-codes')
const { APIError } = require('../../middleware/errorHandler')
const paymentModel = require('../../model/payment')
const userModel = require('../../model/user')
const { Stripe } = require('./stripe')


const getPayments = async (req, res) => {
    //get payemnt
    const payment = await paymentModel.find(req.query).sort("createdAt");

    //send response
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data : {
            count: payment.length,
            payment: payment,
        }
    });
}


const makePayment = async (req, res) => {
    //filtering incoming data
    const { amount, userID } = req.body

    //validation
    if (!userID) throw new APIError("userID is required", StatusCodes.BAD_REQUEST)
    const user = await userModel.findById({ _id: userID }).exec();
    if (!user) throw new APIError("user not found", StatusCodes.NOT_FOUND)
    if (!amount) throw new APIError("amount is required", StatusCodes.BAD_REQUEST)

    //payment
    const paymentStripe = await Stripe(req)
    if (!paymentStripe) throw new APIError("Payment Error", StatusCodes.BAD_GATEWAY)

    //create payment
    await paymentModel.create({
        amount: amount,
        userID: userID,
    });

    //send response
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: "Payment success"
    })

}

module.exports = {
    getPayments,
    makePayment
}