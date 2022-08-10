const { StatusCodes } = require('http-status-codes')
const { APIError } = require('../../middleware/errorHandler')
const paymentModel = require('../../model/payment')
const userModel = require('../../model/user')
const { Stripe } = require('./stripe')


const getPayments = async (req, res) => {

    let payment = undefined
    Object.entries(req.params).length === 0 ?
        payment = await paymentModel.find(req.query).select(req.query.select).sort(req.query.sort) :
        payment = await paymentModel.findById(req.params._id).select(req.query.select).sort(req.query.sort)

    //send response
    if (payment.length === 0)
        return res.status(StatusCodes.OK).json({
            status: StatusCodes.NOT_FOUND,
            data: "No payment found",
        });

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: {
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
    const newPaymentInfo = await paymentModel.create({
        amount: amount,
        userID: userID,
    });

    //send response
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: newPaymentInfo
    })

}

//Update post
const updatePayment = async (req, res) => {
    const { postID } = req.body;
    const { _id } = req.params;

    if (!_id) throw new APIError("paymentID required", StatusCodes.NOT_FOUND)
    if (!postID) throw new APIError("postID required", StatusCodes.NOT_FOUND)

    await paymentModel.findByIdAndUpdate(
        { _id: _id },
        { postID: postID },
    );

    return res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        data: "payment attached to post successfully.",
    });
};

module.exports = {
    getPayments,
    makePayment,
    updatePayment
}