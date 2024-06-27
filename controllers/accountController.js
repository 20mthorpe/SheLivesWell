const util = require('../utilities/');
//const accountModel = require('../models/accountModel');
const accountController = {}
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


/* ***********************
Deliver the login view
*************************/
accountController.buildLogin = async function(req, res){
    let nav = await util.getNav();
    res.render('account/login', { 
        title: 'Login',
        nav,
        errors: null
     });
}

/* ***********************
Process the login form
*************************/


/* ***********************
Process the logout
*************************/


/* ***********************
Deliver the register view
*************************/
accountController.buildRegistration = async function(req, res){
    let nav = await util.getNav();
    res.render('account/register', { 
        title: 'Register',
        nav,
        errors: null
     });
}
/* ***********************
Process the registration form
*************************/
accountController.registerAccount = async function(req, res){
    let nav = await util.getNav();
    const { fname, lname, username, email, password } = req.body;

}

/* ***********************
Deliver the account view
*************************/
accountController.buildAccount = async function(req, res) {
    let nav = await util.getNav();
    res.render('account/', { 
        title: 'Account',
        nav,
        errors: null
     });
}

/* ***********************
Deliver edit account view
*************************/
accountController.buildEditAccount = async function(req, res) {
    let nav = await util.getNav();
    res.render('account/edit', { 
        title: 'Edit Account',
        nav,
        errors: null
     });
}

/* ***********************
process account update
*************************/


module.exports = accountController;