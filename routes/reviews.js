const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const reviews = require('../controllers/reviews')
const { validateRewiew, isLoggedIn, isReviewAuthor } = require('../middleware')




router.post('/', isLoggedIn, validateRewiew, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))


module.exports = router