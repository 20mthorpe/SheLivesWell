const util = require('../utilities/');
//const accountModel = require('../models/accountModel');
const accountController = {}
const bcrypt = require('bcryptjs');
const session = require('express-session');
const flash = require('connect-flash');
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
    let user;
    console.log(req.body);
    const { fname, lname, username, email, password } = req.body;

    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
        req.flash('error', 'Error hashing password');
        return res.status(500).redirect('/account/register', {
            title: 'Register',
            nav,
            errors: null,
        });
    }
    user = {
        fname: fname,
        lname: lname,
        username: username,
        email: email,
        password_hash: hashedPassword,
        auth_level: 1,
    };

    try {

        const regResult = await accountModel.registerAccount(user)
        
        if (regResult){
            req.flash(
                "notice",
                `Congrats! You're registered ${fname}! Please log in.`
            )
            return res.status(201).render('account/login', {
                title: 'Login',
                nav,
                errors: null
            })
        } else {
            req.flash("notice", "Registration failed. Please try again.")
            return res.status(501).render('account/register', {
                title: 'Registration',
                nav,
                errors: "Registration failed. Please try again."
            })
        }
    } catch (err) {
        req.flash("error", "Registration failed. Please try again.")
        return res.status(501).render('account/register', {
            title: 'Registration',
            nav,
            errors: "Registration failed. Please try again."
        })
    }
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