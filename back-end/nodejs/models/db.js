const mongoose = require('mongoose')
const dbConfig = require('../config/db.config.js');


// Connecting to the Mongo Atlas database
const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
        console.log('Connected to database ')
      })
      .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
      })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB