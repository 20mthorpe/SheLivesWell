const util = require('./');
const accountModel = require('../models/accountModel');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const accountValidation = {}

/* ***********************
* Login Rules
*************************/
// accountValidation.loginRules = function(){
// }

/* ***********************
* Check Login Data
*************************/
// accountValidation.checkLoginData = function(){
// }

/* ***********************
* Registration Rules
*************************/
// accountValidation.registrationRules = function(){
// }

/* ***********************
* Check Registration Data
*************************/
// accountValidation.checkRegistrationData = function(){
// }

/* ***********************
* Edit Rules
*************************/
// accountValidation.editRules = function(){
// }

/* ***********************
* Check Edit Data
*************************/
// accountValidation.checkEditData = function(){
// }

module.exports = accountValidation;