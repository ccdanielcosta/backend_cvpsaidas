const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/outgoing.controller');

router.post('/', shipmentController.create);
router.get('/:shipmentId', shipmentController.getById);
router.get('/getRoutes/:shipmentDriver', shipmentController.getShipmentDriver);
router.get('/',shipmentController.getAll);
router.put('/:shipmentId', shipmentController.updateById);



module.exports = router;