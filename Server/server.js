const express = require('express');
const connectToMongo = require('./db');
const PORT = process.env.PORT || 5000;
connectToMongo();

const app = express();

app.use(express.json());

//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/control', require('./routes/control'));
app.use('/api/addQuestion', require('./routes/addQuestion'));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})