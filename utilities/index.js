//const jwt = require('jsonwebtoken');

const { name } = require('ejs');

//const bcrypt = require('bcrypt');
require('dotenv').config();

const utilities = {}

utilities.getNav = async function(){
    let list = "<ul>"
    list += "<li><a href='/'>Home</a></li>"
    list += "<li><a href='/wellness/physical'>Physical</a></li>"
    list += "<li><a href='/wellness/emotional'>Emotional</a></li>"
    list += "<li><a href='/wellness/social'>Social</a></li>"
    list += "<li><a href='/wellness/spiritual'>Spiritual</a></li>"
    list += "<li><a href='/wellness/financial'>Financial</a></li>"
    list += "<li><a href='/wellness/intellectual'>Intellectual</a></li>"
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

/* ***********************
Build Media Grid HTML
*************************/
utilities.buildMediaGrid = function(mediaArray){
    let grid = "<div class='media-grid'>";
    if(mediaArray.length > 0){
        mediaArray.forEach(media => {
            grid += `<div class='media-item-card'>`;
            if(media.mediaType === "image"){
                grid += `<img src='${media.link}' alt='${media.description}' />`;
            } else if(media.mediaType === "video"){
                grid += `<video src='${media.link}' controls></video>`;
            } else if (media.mediaType === "audio"){
                grid += `<audio src='${media.link}' controls></audio>`;
            } else if (media.mediaType === "document"){
                grid += `<a href='${media.link}' </a>`;
            } else if (media.mediaType === "link"){
                grid += `<a href='${media.link}' </a>`;
            } else if (media.mediaType === "website") {
                grid += `<a href='${media.link}' </a>`;
            } else {
                grid += `<p>Invalid media type</p>`;
            }
            grid += `<p>${media.description}</p>`;
            grid += `</div>`;
        });
        grid += "</div>";
    } else {
        grid += "<p>No media found</p>";
    }
    return grid;
} 


module.exports = utilities;