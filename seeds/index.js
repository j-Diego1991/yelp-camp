const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')  // Retroceder un nivel para vincular el modelo

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
.then(()=>{
    console.log('DATABASE CONNECTED')
})
.catch(()=>{
    console.log('CONEXION ERROR')
    console.log(err)
})

// Elegir un elemento al azar del arr seedHelpers.js
const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})

    // Iterar 50 veces en el array cities.js
    for(let i = 0; i < 50; i++){

        // Elegir un elemento de array cities.js al azar
        const random1000 = Math.floor(Math.random() * 1000)

        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
    console.log('DATABASE CONEXION ENDED')
})