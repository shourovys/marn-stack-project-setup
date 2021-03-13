const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./Routers/AuthRouter');
require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/auth', authRouter);
// app.use('/cinema', cinemaRouter);

app.get('/', (req, res) => res.send('welcome to auth'));

const CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const PORT = process.env.PORT || 4000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)),
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
