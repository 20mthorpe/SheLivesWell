
/* ***********************
* Require Statements
*************************/

const express = require('express');
const dotenv = require('dotenv');
//const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const baseController = require('./controllers/baseController');

const app = express();
const static = require('./routes/static');

const env = require("dotenv").config()

const session = require("express-session")
const expressLayouts = require("express-ejs-layouts")

const accountRoute = require('./routes/accountRoute')
const utilities = require('./utilities')


/* ***********************
* Middleware
*************************/
app.use(static);


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

// file not found route
app.use(async (req, res, next) =>{
  next({status: 404, message: 'Sorry, we appear to have lost that page.'})
})


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
* Local Server Information
* Values from .env (environment) file
*************************/

const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
    console.log(`app listening on ${host}:${port}`)
  })