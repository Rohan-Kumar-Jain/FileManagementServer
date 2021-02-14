require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const fileupload = require('express-fileupload');
const mongoose = require('mongoose');

const indexRouter = require('./routes/routes');

const app = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGO_URL;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileupload());

// Connection with mongoDB
mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

// Custom route
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
