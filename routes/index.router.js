const express = require ('express');
const router = express.Router();
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');


router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);

// private route

router.get('/userprofile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get('/getDrivers', jwtHelper.verifyJwtToken, ctrlUser.getDrivers);


module.exports = router;