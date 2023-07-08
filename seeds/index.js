const mongoose = require("mongoose");
const cities = require("./cities");
const imgs = require("./imgs")
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground"); // Retroceder un nivel para vincular el modelo

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp")
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch(() => {
    console.log("CONEXION ERROR");
    console.log(err);
  });

// Elegir un elemento al azar del arr seedHelpers.js
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});

  // Iterar 50 veces en el array cities.js
  for (let i = 0; i < 150; i++) {
    // Elegir un elemento de array cities.js al azar
    const random1000 = Math.floor(Math.random() * 1000);

    const price = Math.floor(Math.random() * 20) + 10

    const image = Math.floor(Math.random() * 50)

    const camp = new Campground({
      author: '64a4e5ac02c12a10e4086826',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, quis. Ut, dolorem deserunt libero laudantium, ipsum omnis quibusdam itaque quis commodi excepturi voluptatum, fugiat eius ducimus ab numquam labore? Ea!",
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dyx2bmsoz/image/upload/v1688681716/Yelp-Camp/ogiyppbditcghszfk94a.jpg',
          filename: 'Yelp-Camp/ogiyppbditcghszfk94a'
        }, 
        {
          url: 'https://res.cloudinary.com/dyx2bmsoz/image/upload/v1688681716/Yelp-Camp/dj2ozplzpw72vlfykdqq.jpg',
          filename: 'Yelp-Camp/dj2ozplzpw72vlfykdqq'
        },
        {
          url: 'https://res.cloudinary.com/dyx2bmsoz/image/upload/v1688681716/Yelp-Camp/jppivodlavupbn8kl3ld.jpg',
          filename: 'Yelp-Camp/jppivodlavupbn8kl3ld'
        },
        {
          url: 'https://res.cloudinary.com/dyx2bmsoz/image/upload/v1688681604/Yelp-Camp/dbaeoxzzbhsdjp2sqf6r.jpg',
          filename: 'Yelp-Camp/dbaeoxzzbhsdjp2sqf6r'
        }
      ],
      geometry: {
          type: 'Point', 
          coordinates: [ 
            cities[random1000].longitude,
            cities[random1000].latitude
          ] 
      }
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("DATABASE CONEXION ENDED");
});
