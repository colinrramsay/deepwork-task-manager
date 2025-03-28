//Require dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/database');

//CORS
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000', // React app's URL
    credentials: true
}));

//Require routes
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');

//Import environment variables
require('dotenv').config({path: './config/.env'});
const PORT = process.env.PORT;

//Passport config
require('./config/passport')(passport);

//Connect to DB
connectDB()

//Sessions Middleware
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
    })
)

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes middleware
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

//start server
app.listen(PORT, _ => {
    console.log(`Server running on port ${PORT}`);
})