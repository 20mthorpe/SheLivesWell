const express = require('express');
// const accountValidation = require('../utilities/accountValidation');
const util = require('../utilities');
const router = new express.Router();
const accountController = require('../controllers/accountController');

router.get('/', util.handleErrors(accountController.buildAccount));
//router.get('/', util.checkLogin, util.handleErrors(accountController.buildAccount));

router.get('/login', util.handleErrors(accountController.buildLogin));

router.post(
    '/login', 
//     accountValidation.loginRules(),
//     accountValidation.checkLoginData,
    util.handleErrors(accountController.processLogin)
);


router.get('/logout', util.handleErrors(accountController.processLogout));

router.get('/register', util.handleErrors(accountController.buildRegistration));
router.post(
     '/register', 
//     accountValidation.registrationRules(),
//     accountValidation.checkRegistrationData,
     util.handleErrors(accountController.registerAccount)
);



router.get('/edit', util.handleErrors(accountController.buildEditAccount));
router.post(
     '/edit', 
//     accountValidation.editRules(),
//     accountValidation.checkEditData,
     util.handleErrors(accountController.processEditAccount)
 );


module.exports = router;