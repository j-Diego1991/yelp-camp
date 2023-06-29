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
  for (let i = 0; i < 50; i++) {
    // Elegir un elemento de array cities.js al azar
    const random1000 = Math.floor(Math.random() * 1000);

    const price = Math.floor(Math.random() * 20) + 10

    const image = Math.floor(Math.random() * 50)

    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `${imgs[image].link}`,
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores, quis. Ut, dolorem deserunt libero laudantium, ipsum omnis quibusdam itaque quis commodi excepturi voluptatum, fugiat eius ducimus ab numquam labore? Ea!",
      price
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log("DATABASE CONEXION ENDED");
});
