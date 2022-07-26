const { StatusCodes } = require('http-status-codes');
const userModel = require('../model/user');
const { APIError } = require('./errorHandler');
const fs = require('fs')
const cloudinary = require('cloudinary').v2;

const imageUploader = async (req, res, next) => {

    if (req.method === "PATCH" && !req.files) {
        next();
        return;
    }

    //userID or boardingID
    const { _id } = req.params

    const { userID } = req.body
    if (!_id && !userID) throw new APIError("userID required", StatusCodes.BAD_REQUEST)
    const user = await userModel.findById({ _id: userID ?? _id })
    if (!user) throw new APIError("user not found", StatusCodes.NOT_FOUND)

    // deal with file
    const files = req.files
    if (!req.files) throw new APIError("image/s required", StatusCodes.BAD_REQUEST)
    if (!req.body.imageFolder) throw new APIError("imageFolder required. select user or boarding", StatusCodes.BAD_REQUEST)
    if (!['user', 'boarding'].includes(req.body.imageFolder)) throw new APIError("select a folder name. user or boarding", StatusCodes.BAD_REQUEST)

    cloudinary.config({
        cloud_name: 'razamohamed',
        api_key: '255548326596334',
        api_secret: 'QdIQyvXW0qfVox55Qf4p4tQeGT0'
    });

    let imageURL = []

    //mulitple images
    if (req.originalUrl.includes("boarding") && files.image instanceof Array) {
        let i = 0
        for (const file of files.image) {
            const image = await cloudinary
                .uploader
                .upload(file.tempFilePath, {
                    folder: "FIND CITY/" + req.body.imageFolder,
                    use_filename: true,
                    filename_override: `${userID ?? _id} ${++i}.png`,
                    overwrite: true,
                    unique_filename: false,
                })
            imageURL.push(image.url)
        }
    }

    if (req.originalUrl.includes("user")) {
        // single image
        const image = await cloudinary
            .uploader
            .upload(files.image.tempFilePath, {
                folder: "FIND CITY/" + req.body.imageFolder,
                use_filename: true,
                filename_override: `${userID ?? _id}.png`,
                overwrite: true,
                unique_filename: false,
            })
        imageURL = image.url
    }

    req.body.image = imageURL

    fs.rmSync('tmp', { recursive: true, force: true }); // delete temp image folder

    next()
}

module.exports = { imageUploader }