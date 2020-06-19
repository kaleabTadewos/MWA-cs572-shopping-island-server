const { Review, validateId, validateWithOutId, validateWithId } = require('../models/review');
const ApiResponse = require('../models/apiResponse');
const ErrorResponse = require('../models/errorResponse');

//CRUD Operations
//Create Operation
exports.insert = async(req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
    let review = {};
    review = await Review.findOne({ $and: [{ userId: req.body.userId }, { productId: req.body.productId }] }, { userId: 1, productId: 1, text: 1 })
    if (review) {
        await Review.findByIdAndUpdate(review._id, {
            $push: { text: req.body.text }
        }, { new: true, useFindAndModify: true })
    } else {
        let newReview = new Review({
            userId: req.body.userId,
            productId: req.body.productId,
            text: [req.body.text]
        });
        review = await Review.create(newReview);
    }
    res.status(201).send(new ApiResponse(201, 'success', review));
};

exports.reviewStatus = async(req, res, next) => {
    const { error } = validateWithOutId(req.body);
    if (error) return res.status(400).send(new ErrorResponse('400', error.details[0].message));
<<<<<<< HEAD
    let review = await Review.findById(req.body.reviewId);
    if (!review) return res.status(400).send(new ErrorResponse('400', 'no content found!'));
    let newReview = await Review.findByIdAndUpdate(req.body.reviewId, {
        reviewStatus: req.body.status
    }, { new: true, useFindAndModify: true });
    res.status(201).send(new ApiResponse(201, 'success', newReview));

=======
>>>>>>> 96cd965aefb73e984d119f90deaa53f5e836ab64
}