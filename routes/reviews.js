const express = require('express')
const router = express.Router({ mergeParams: true })
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const { reviewSchema } = require('../schemas.js')

const Campground = require('../models/campground')
const Review = require('../models/review')

const validateRewiew = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map( el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next()
    }
}

// rutas para las reviews
router.post('/', validateRewiew, catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body.review)
    campground.reviews.push(review)
    await review.save()
    await campground.save()
    req.flash('success', 'Successfully added review')
    res.redirect(`/campgrounds/${campground.id}`)
}))

router.delete('/:reviewId', catchAsync( async (req, res) => {
    const { id, reviewId } = req.params
    await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId)
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`)
}))
//

module.exports = router