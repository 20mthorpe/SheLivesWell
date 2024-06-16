//const jwt = require('jsonwebtoken');

const { name } = require('ejs');

//const bcrypt = require('bcrypt');
require('dotenv').config();

const utilities = {}

utilities.getNav = async function(){
    let list = "<ul>"
    list += "<li><a href='/'>Home</a></li>"
    list += "<li><a href='/physical'>Physical</a></li>"
    list += "<li><a href='/emotional'>Emotional</a></li>"
    list += "<li><a href='/social'>Social</a></li>"
    list += "<li><a href='/spiritual'>Spiritual</a></li>"
    list += "<li><a href='/financial'>Financial</a></li>"
    list += "<li><a href='/intellectual'>Intellectual</a></li>"
    list += "</ul>"
    return list;
    // return [
    //     {name: "Home", link: "/"},
    //     {name: "Physical", link: "/physical"},
    //     {name: "Emotional", link: "/emotional"},
    //     {name: "Social", link: "/social"},
    //     {name: "Spiritual", link: "/spiritual"},
    //     {name: "Financial", link: "/financial"}
    // ]
}

/* ***********************
* Error Handling
*************************/
utilities.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

module.exports = utilities;