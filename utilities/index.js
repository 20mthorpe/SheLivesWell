//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
require('dotenv').config();

const utilities = {}

utilities.getNav = async function(){
    return [
        {name: "Home", link: "/"},
        {name: "About", link: "/about"},
        {name: "Contact", link: "/contact"},
        {name: "Login", link: "/login"},
        {name: "Register", link: "/register"}
    ]
}

/* ***********************
* Error Handling
*************************/
utilities.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = utilities;