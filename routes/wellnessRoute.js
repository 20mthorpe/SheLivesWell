const express = require('express');

const util = require('../utilities');
const router = new express.Router();
const wellnessController = require('../controllers/wellnessController');
//const wellnessModel = require('../models/wellnessModel');

/* Routes for site pages */

router.get('/liked', util.handleErrors(wellnessController.buildLikedPage));
router.get('/:category', util.handleErrors(wellnessController.buildWellness));


// is this router working?
//router.get('/', util.handleErrors(wellnessController.buildWellness));

// router.get('/social', util.handleErrors(wellnessController.buildSocial));

// router.get('/physical', util.handleErrors(wellnessController.buildPhysical));

// router.get('/emotional', util.handleErrors(wellnessController.buildEmotional));

// router.get('/spiritual', util.handleErrors(wellnessController.buildSpiritual));

// router.get('/intellectual', util.handleErrors(wellnessController.buildIntellectual));

// router.get('/financial', util.handleErrors(wellnessController.buildFinancial));

/* API routes */

// Get all wellness data
router.get('/wellnessdata',
    util.handleErrors(wellnessController.getWellness)
);


router.put('/like/:mediaId', util.handleErrors(wellnessController.addUserToLiked));
router.put('/unlike/:mediaId', util.handleErrors(wellnessController.removeUserFromLiked));
// Get wellness data by id
// router.get('/wellnessdata/:id',
//     util.handleErrors(wellnessController.getWellnessById)
// );

// Get wellness data by category
// router.get('/wellnessdata/:category',
//     util.handleErrors(wellnessController.getWellnessByCategory)
// );

// router.get('/liked',
//     util.handleErrors(wellnessController.getLikedByUser)
// );

// // Post (add new) wellness data
// router.post('/wellnessdata',
//     util.handleErrors(wellnessController.postWellness)
// );

//Put (update) wellness data
// router.put('/wellnessdata/:id',
//     util.handleErrors(wellnessController.addUserToLiked)
// );

// // Delete wellness data
// router.delete('/wellnessdata/:id',
//     util.handleErrors(wellnessController.deleteWellness)
// );

module.exports = router;