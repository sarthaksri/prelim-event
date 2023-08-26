const express = require('express');
const connectToMongo = require('./db');
const cookiep = require("cookie-parser")
const fileupload = require("express-fileupload")
const authroutes = require("./routes/auth")
const PORT = process.env.PORT || 1000;
connectToMongo();

const app = express();

const cors = require('cors')

app.use(express.json());
app.use(cookiep());
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"./temp"

},
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
  
    next();
  }),
app.use(cors({
    origin:"https://frontend1-rosy.vercel.app",
    credentials:true,
}))  
));

//available routes
app.use('/api/auth', authroutes);
app.use('/api/control', require('./routes/control'));
app.use('/api/addQuestion', require('./routes/addQuestion'));

app.get("/",(req,res)=>{
  return res.json({
      success:true,
      message:"YOUR SERVER IS ACTIVATED"
  })
})
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})