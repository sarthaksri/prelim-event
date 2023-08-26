const mongoose = require('mongoose');
require("dotenv").config()
// const mongoURI =  "mongodb+srv://sarthaksri017:xpedition@cluster0.jn0oyw5.mongodb.net/iste";


const connectToMongo = ()=>{
    mongoose.connect(process.env.mongodburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected Successfully To Database'))
    .catch(error => console.log('Failed to connect', error))
}

module.exports = connectToMongo ;