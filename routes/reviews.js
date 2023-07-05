const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const Campground = require('../models/campground')
const Review = require('../models/review')
const { validateRewiew, isLoggedIn, isReviewAuthor } = require('../middleware')



// rutas para las reviews
router.post('/', isLoggedIn, validateRewiew, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    review.author = req.user.id
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'Successfully added review')
    res.redirect(`/campgrounds/${campground.id}`)
}))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync( async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`)
}))
//

module.exports = router