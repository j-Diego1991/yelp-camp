const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Review = require('./review')

// https://res.cloudinary.com/dyx2bmsoz/image/upload/w_1500/v1688690339/Yelp-Camp/orroj6kqwg1jltorjkw3.jpg

const imageSchema = new Schema({
    url: String,
    filename: String
})

imageSchema.virtual('thumbnail').get(function() {
   return this.url.replace('/upload', '/upload/w_200')
})

const CampgroundSchema = new Schema({
    title: String,
    images: [imageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews 
            }
        })
    }
})


module.exports = mongoose.model('Campground', CampgroundSchema)