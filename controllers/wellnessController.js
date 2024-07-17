const mongodb = require('../database/connect.js');
const ObjectId = require('mongodb').ObjectId;
//const db = mongodb.getDb();

const util = require('../utilities');
const wellnessController = {}

const wellnessModel = require('../models/wellnessModel');


/* ***********************
BUILD WELLNESS PAGES

These functions render the wellness pages.
*************************/

wellnessController.buildWellness = async function(req, res){
    const user = res.locals.user;
    let nav = await util.getNav(user);
    const category = req.params.category;
    //console.log('category: ' + req.params.category)
    const category_data = await wellnessModel.getWellnessByCategory(category);
    //console.log(category_data)
    const isLoggedIn = res.locals.loggedin;
    //console.log('user: ' + user)
    //console.log('isLoggedIn: ' + isLoggedIn)
    const grid = util.buildMediaGrid(category_data, isLoggedIn, user);

    res.render('wellness/', { 
        title: category + ' wellness',
        nav,
        errors: null,
        grid,
     });
}

wellnessController.buildLikedPage = async function(req, res){
    const user = res.locals.user;
    let nav = await util.getNav(user);
    const user_id = res.locals.user._id;
    const liked_data = await wellnessModel.getLikedByUser(user_id);
    const isLoggedIn = res.locals.loggedin;
    if (!isLoggedIn) {
        res.redirect('/login', errors='You must be logged in to view liked items.');
    }
    const grid = util.buildMediaGrid(liked_data, isLoggedIn, user);
    res.render('wellness/liked', { 
        title: 'Liked',
        nav,
        errors: null,
        grid,
     });
}

// wellnessController.buildSocial = async function(req, res){
//     let nav = await util.getNav();
//     res.render('wellness/social', { 
//         title: 'Social',
//         nav,
//         errors: null
//      });
// }

// wellnessController.buildPhysical = async function(req, res){
//     let nav = await util.getNav();
//     res.render('wellness/physical', { 
//         title: 'Physical',
//         nav,
//         errors: null
//      });
// }

// wellnessController.buildEmotional = async function(req, res){
//     let nav = await util.getNav();
//     res.render('wellness/emotional', { 
//         title: 'Emotional',
//         nav,
//         errors: null
//      });
// }

// wellnessController.buildSpiritual = async function(req, res){
//     let nav = await util.getNav();
//     res.render('wellness/spiritual', { 
//         title: 'Spiritual',
//         nav,
//         errors: null
//      });
// }

// wellnessController.buildIntellectual = async function(req, res){
//     let nav = await util.getNav();
//     res.render('wellness/intellectual', { 
//         title: 'Intellectual',
//         nav,
//         errors: null
//      });
// }

// wellnessController.buildFinancial = async function(req, res){
//     let nav = await util.getNav();
//     res.render('wellness/financial', { 
//         title: 'Financial',
//         nav,
//         errors: null
//      });
// }

// /* ***********************
// WELLNESS API REQUESTS

// These functions handle the API requests for the wellness database.
// *************************/

// /* GET all wellness data */
// wellnessController.getWellness = async function(req, res, next){
//     //let wellness = await wellnessModel.getWellness();
//     //res.json(wellness);
//     try{
//         const db = mongodb.getDb();
//         const result = await db.db().collection('wellness').find().toArray();
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('error getting wellness data');
//     }
// }

// /* GET wellness data by category */
// wellnessController.getWellnessByCategory = async function(req, res, next){
//     try{
//         const db = mongodb.getDb();
//         const result = await db.db().collection('wellness').find({category: req.params.category}).toArray();
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('error getting wellness data');
//     }
// }

// /* GET wellness data by ID */
// wellnessController.getWellnessById = async function(req, res, next){
//     try{
//         const db = mongodb.getDb();
//         const result = await db.db().collection('wellness').findOne({_id: ObjectId(req.params.id)});
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('error getting wellness data');
//     }
// }

// // /* POST new wellness data */
// // wellnessController.postWellness = async function(req, res, next){
// //     try{
// //         const db = mongodb.getDb();
// //         const result = await db.db().collection('wellness').insertOne(req.body);
// //         res.setHeader('Content-Type', 'application/json');
// //         res.status(200).json(result);
// //     } catch (err) {
// //         console.log(err);
// //         res.status(500).send('error posting wellness data');
// //     }
// // }

// // /* PUT updated wellness data */
// // wellnessController.putWellness = async function(req, res, next){
// //     try{
// //         const db = mongodb.getDb();
// //         const result = await db.db().collection('wellness').updateOne({_id: ObjectId(req.params.id)}, {$set: req.body});
// //         res.setHeader('Content-Type', 'application/json');
// //         res.status(200).json(result);
// //     } catch (err) {
// //         console.log(err);
// //         res.status(500).send('error updating wellness data');
// //     }
// // }

// // /* DELETE wellness data */
// // wellnessController.deleteWellness = async function(req, res, next){
// //     try{
// //         const db = mongodb.getDb();
// //         const result = await db.db().collection('wellness').deleteOne({_id: ObjectId(req.params.id)});
// //         res.setHeader('Content-Type', 'application/json');
// //         res.status(200).json(result);
// //     } catch (err) {
// //         console.log(err);
// //         res.status(500).send('error deleting wellness data');
// //     }
// // }

module.exports = wellnessController;