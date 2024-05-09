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

module.exports = utilities;