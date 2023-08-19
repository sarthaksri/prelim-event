const mongoose = require('mongoose');
const mongoURI =  "mongodb+srv://sarthaksri017:xpedition@cluster0.jn0oyw5.mongodb.net/";


const connectToMongo = ()=>{
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected Successfully To Database'))
    .catch(error => console.log('Failed to connect', error))
}

module.exports = connectToMongo ;