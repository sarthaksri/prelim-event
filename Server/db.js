const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://sarthaksri017:inotebook@cluster0.byq98pl.mongodb.net/";


const connectToMongo = ()=>{
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected Successfully To Database'))
    .catch(error => console.log('Failed to connect', error))
}

module.exports = connectToMongo ;