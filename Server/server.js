const express = require('express');
const connectToMongo = require('./db');

connectToMongo();

const app = express();
const port = 5000;

app.use(express.json());

//available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/control', require('./routes/control'));
app.use('/api/addQuestion', require('./routes/addQuestion'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})