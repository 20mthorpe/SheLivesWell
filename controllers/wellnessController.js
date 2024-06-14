const mongodb = require('../database/connect.js');
const ObjectId = require('mongodb').ObjectId;
//const db = mongodb.getDb();

const util = require('../utilities');
const wellnessController = {}
//const wellnessModel = require('../models/wellnessModel');


/* ***********************
BUILD WELLNESS PAGES

These functions render the wellness pages.
*************************/

wellnessController.buildWellness = async function(req, res){
    let nav = await util.getNav();
    res.render('wellness/', { 
        title: 'Wellness',
        nav,
        errors: null
     });
}

wellnessController.buildSocial = async function(req, res){
    let nav = await util.getNav();
    res.render('wellness/social', { 
        title: 'Social',
        nav,
        errors: null
     });
}

wellnessController.buildPhysical = async function(req, res){
    let nav = await util.getNav();
    res.render('wellness/physical', { 
        title: 'Physical',
        nav,
        errors: null
     });
}

wellnessController.buildEmotional = async function(req, res){
    let nav = await util.getNav();
    res.render('wellness/emotional', { 
        title: 'Emotional',
        nav,
        errors: null
     });
}

wellnessController.buildSpiritual = async function(req, res){
    let nav = await util.getNav();
    res.render('wellness/spiritual', { 
        title: 'Spiritual',
        nav,
        errors: null
     });
}

wellnessController.buildIntellectual = async function(req, res){
    let nav = await util.getNav();
    res.render('wellness/intellectual', { 
        title: 'Intellectual',
        nav,
        errors: null
     });
}

wellnessController.buildFinancial = async function(req, res){
    let nav = await util.getNav();
    res.render('wellness/financial', { 
        title: 'Financial',
        nav,
        errors: null
     });
}

/* ***********************
WELLNESS API REQUESTS

These functions handle the API requests for the wellness database.
*************************/

/* GET all wellness data */
wellnessController.getWellness = async function(req, res, next){
    //let wellness = await wellnessModel.getWellness();
    //res.json(wellness);
    try{
        const db = mongodb.getDb();
        const result = await db.db().collection('wellness').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('error getting wellness data');
    }
}

module.exports = wellnessController;