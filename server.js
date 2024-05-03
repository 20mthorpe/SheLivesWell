const express = require('express');

const baseController = require('./controllers/baseController');

const app = express();

const env = require("dotenv").config()

const session = require("express-session")
