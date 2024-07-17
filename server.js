
/* ***********************
* Require Statements
*************************/

const express = require('express');
const dotenv = require('dotenv');
const mongodb = require('./database/connect');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const baseController = require('./controllers/baseController');

const app = express();
const static = require('./routes/static');

const env = require("dotenv").config()

const session = require("express-session")
const expressLayouts = require("express-ejs-layouts")

const accountRoute = require('./routes/accountRoute')
const wellnessRoute = require('./routes/wellnessRoute')
const likeRoute = require('./routes/likeRoute')
const utilities = require('./utilities')
const flash = require('connect-flash');

//const jwt = require('jsonwebtoken');


/* ***********************
* Middleware
*************************/
app.use(static);
app.use(express.json())
app.use(flash())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(utilities.checkJWTToken)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
})
)



/* ***********************
* Configuration (view engine and templates)
*************************/

app.set('view engine', 'ejs');
app.use(expressLayouts)
app.set('layout', './layouts/layout')


/* ***********************
* Routes
*************************/

// index route
app.get('/', baseController.buildHome);

// account routes
app.use("/account", utilities.handleErrors(accountRoute));

// wellness routes
app.use("/wellness", utilities.handleErrors(wellnessRoute));

// like routes
app.use("/like", utilities.handleErrors(likeRoute));

// file not found route
app.use(async (req, res, next) =>{
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})

/* ***********************
* Local Server Information
* Values from .env (environment) file
*************************/

const port = process.env.PORT;
const host = process.env.HOST;


/* ***********************
* Initialize Wellness DB and Server
*************************/
mongodb.initDb((err, db) => {
  if (err) {
    console.log(err);
    process.exit(1);
  } else {
    app.listen(port);
    console.log(`Server listening on port ${port}`);
  }
}
);


/* ***********************
* Express Error Handlers
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  if(err.status == 404){
    message = err.message
  } else {
    message = 'Oh no! There was a crash. Maybe try a different route?'
  }
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message,
    nav
  })
})

app.use(async(err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`500 Error at: "${req.originalUrl}": ${err.message}`)
  res.status(500).render("errors/error", {
    title: '500 Internal Server Error',
    message: 'Oh no! There was a crash. Maybe try a different route?',
    nav
  })
})


/* ***********************
 * Log statement to confirm server operation
 *************************/
// app.listen(port, () => {
//     console.log(`app listening on ${host}:${port}`)
//   })