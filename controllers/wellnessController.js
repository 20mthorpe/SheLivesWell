const util = require('../utilities');
const wellnessController = {}
//const wellnessModel = require('../models/wellnessModel');

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

module.exports = wellnessController;