const jwt = require('jsonwebtoken');

const { name } = require('ejs');
const likeModel = require('../models/likeModel');

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
    const liked = await likeModel.getLikedByUser();
    if (liked.length > 0) {
        list += "<li><a href='/like'>Liked</a></li>"
    }
    // if (favorites){
    //     list += "<li><a href='/favorites'>Favorites</a></li>"
    // }
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
            grid += `<button class='like-button' data-media-id='${media._id}'>♥`
            //grid += `<img src='/images/heart-icon.png' alt='heart icon' class='heart-icon height=20 width=20>`;
            //grid +=    `<i class='heart-icon ${media.isLiked ? "liked": ""}'></i>`
            grid += `</button>`;
            if(media.mediaType === "image"){
                grid += `<img src='${media.link}' alt='${media.description}' />`;
            } else if(media.mediaType === "video"){
                grid += `<a href='${media.link}' target="_blank">${media.title}</a>`;
                if (media.embedLink){
                    grid += `<iframe src="${media.embedLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
                }
            } else if (media.mediaType === "website") {
                grid += `<a href="${media.link}" target="_blank">${media.title}</a>`;
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

// utilities.buildLikedMediaGrid = function(mediaArray){
//     let grid = "<div class='media-grid'>";
//     if(mediaArray.length > 0){
//         mediaArray.forEach(media => {
//             grid += `<div class='media-item-card'>`;
//             if(media.mediaType === "image"){
//                 grid += `<img src='${media.link}' alt='${media.description}' />`;
//             } else if(media.mediaType === "video"){
//                 grid += `<a href='${media.link}' target="_blank">${media.title}</a>`;
//                 if (media.embedLink){
//                     grid += `<iframe src="${media.embedLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
//                 }
//             } else if (media.mediaType === "website") {
//                 grid += `<a href="${media.link}" target="_blank">${media.title}</a>`;
//             } else {
//                 grid += `<p>Invalid media type</p>`;
//             }
//             grid += `<p>${media.description}</p>`;
//             grid += `</div>`;
//         });
//         grid += "</div>";
//     } else {
//         grid += "<p>No media found</p>";
//     }
//     return grid;
// }


 
utilities.checkJWTToken = (req, res, next) => {
    if (req.cookies.jwt) {
        jwt.verify(
         req.cookies.jwt,
         process.env.ACCESS_TOKEN_SECRET,
         function (err, user) {
          if (err) {
           req.flash("Please log in")
           res.clearCookie("jwt")
           return res.redirect("/account/login")
          }
          res.locals.user = user
          res.locals.loggedin = 1
          next()
         })
       } else {
        next()
       }
    }

// utilities.setLoggedIn = function(bool) {
//     return function(req, res, next){
//         if(bool === true){
//             res.locals.loggedin = true;
//             console.log(res.locals.loggedin);
//         } else {
//             res.locals.loggedin = false;
//             console.log(res.locals.loggedin);
//         }
//         next();
//     }
// }


module.exports = utilities;