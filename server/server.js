// Server setup
const express = require('express')
const app = express()
require('dotenv').config()

// Cors setup
const cors = require('cors');
const corsConfig = require('./configs/cors')
app.use(cors(corsConfig));

// Middlewares setup
const cookieParser = require('cookie-parser');
app.use(cookieParser())
// Parsing the form data into urlencoded version
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const {logEvents} = require('./middlewares/logger');

// Logger

// Routes
app.use('/register', require('./routes/register'));
app.use('/log-in', require('./routes/logIn'));

// app.use(logEvents)
app.listen(process.env.STAGING_PORT,() => {
    console.log(`The server is up and running on server ${process.env.STAGING_PORT}`)
})




