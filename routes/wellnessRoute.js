const express = require('express');

const util = require('../utilities');
const router = new express.Router();
const wellnessController = require('../controllers/wellnessController');


/* Routes for site pages */
router.get('/', util.handleErrors(wellnessController.buildWellness));

router.get('/social', util.handleErrors(wellnessController.buildSocial));

router.get('/physical', util.handleErrors(wellnessController.buildPhysical));

router.get('/emotional', util.handleErrors(wellnessController.buildEmotional));

router.get('/spiritual', util.handleErrors(wellnessController.buildSpiritual));

router.get('/intellectual', util.handleErrors(wellnessController.buildIntellectual));

router.get('/financial', util.handleErrors(wellnessController.buildFinancial));

/* API routes */
router.get('/wellnessdata',
    util.handleErrors(wellnessController.getWellness)
);

module.exports = router;