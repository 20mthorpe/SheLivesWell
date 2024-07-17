const util = require('../utilities/');
const accountModel = require('../models/accountModel');
const accountController = {}
const bcrypt = require('bcryptjs');
//const session = require('express-session');
//const flash = require('connect-flash');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const e = require('connect-flash');
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
accountController.processLogin = async function(req, res){
    let nav = await util.getNav();
    const { username, password } = req.body;
    //console.log(`username: ${username}`);
    try {
        const user = await accountModel.findUser(username);
        if(!user){
            req.flash("error", "Username not found. Please try again.")
            return res.status(401).render('account/login', {
                title: 'Login',
                nav,
                errors: "Username not found. Please try again."
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if(passwordMatch){
            //delete user.password;
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 3600 * 1000});
            //console.log(`user password: ${user.password_hash}`)
            const cookieOptions = {
                httpOnly: true,
                maxAge: 3600 * 1000,
            };

            if(process.env.NODE_ENV !== 'development'){
                cookieOptions.secure = true;
            }
            res.cookie('jwt', accessToken, cookieOptions);
            //console.log(req.cookies.jwt);
            //util.setLoggedIn(true);
            return res.render('account/', {
                title: 'Account',
                nav,
                user: user,
                errors: null
            });

        } else {
            req.flash("error", "Invalid username or password. Please try again.")
            return res.status(401).render('account/login', {
                title: 'Login',
                nav,
                errors: "Invalid username or password. Please try again."
            })
        }
    } catch (err) {
        console.error('Error during login process: ', err);
        req.flash("error", "Error logging in. Please try again.")
        return res.status(500).render('account/login', {
            title: 'Login',
            nav,
            errors: "Error logging in. Please try again."
        });
    }
}

/* ***********************
Process the logout
*************************/
accountController.processLogout = async function(req, res){
    let nav = await util.getNav();
    res.clearCookie('jwt');
    req.flash("notice", "You have been logged out.");
    //localStorage.setItem('isLoggedIn', "false");
    //util.setLoggedIn(false);
    res.redirect('/');
}
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
    //let user;
    //console.log(req.body);
    const { fname, lname, username, email, password } = req.body;
    
    const userEmailExists = await accountModel.findUserByEmail(email)

    if(userEmailExists){
        req.flash("error", "Email already exists. Please try again.")
        return res.status(501).render('account/register', {
            title: 'Registration',
            nav,
            errors: "Email already exists. Please try again."
        })
    }

    const userNameExists = await accountModel.findUser(username)
    if (userNameExists){
        req.flash("error", "Username already exists. Please try again.")
        return res.status(501).render('account/register', {
            title: 'Registration',
            nav,
            errors: "Username already exists. Please try again."
        })
    }

    let hashedPassword
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
        req.flash('error', 'Error hashing password');
        return res.status(500).redirect('/account/register', {
            title: 'Register',
            nav,
            errors: 'Error hashing password',
        });
    }
    const user = {
        fname: fname,
        lname: lname,
        username: username,
        email: email,
        password_hash: hashedPassword,
        auth_level: 1,
    };

    try {
        //console.log(`user fname: ${user.fname}`);

        const regResult = await accountModel.registerUser(user)

        
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
accountController.processEditAccount = async function(req, res) {
    let nav = await util.getNav();
    try {
        const user = await accountModel.findUser(req.body.username);
        console.log(user)
        const userId = user._id;
    
        const updateData = {
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            email: req.body.email,
            //password_hash: req.body.password,
        }
    
        // if (req.body.password) {
        //     updateData.password = req.body.password;
        // }
    
        const updateResult = await accountModel.editUser(userId, updateData);
        res.render('account/logout', { 
            title: 'Logout',
            nav,
            errors: "Account updated successfully, please log in."
         });
        return updateResult;
    } catch (err) {
        req.flash("error", "Error updating account. Please try again.")
        return res.status(501).render('account/edit', {
            title: 'Edit Account',
            nav,
            errors: "Error updating account. Please try again."
        })
    }

    

    
}


module.exports = accountController;