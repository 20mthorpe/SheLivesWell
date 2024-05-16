const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const baseController = require('./controllers/baseController');

const app = express();
const static = require('./routes/static');

const env = require("dotenv").config()

const session = require("express-session")
const expressLayouts = require("express-ejs-layouts")

app.use(static);

app.set('view engine', 'ejs');
app.use(expressLayouts)
app.set('layout', './layouts/layout')



app.get('/', baseController.buildHome);
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