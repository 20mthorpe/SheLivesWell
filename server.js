const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const baseController = require('./controllers/baseController');

const app = express();

const env = require("dotenv").config()

const session = require("express-session")
