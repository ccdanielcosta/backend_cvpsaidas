const express = require('express');
const router = express.Router();
const truckController = require('../controllers/vehicles.controller');

router.get('/', truckController.getAll);
/*router.post('/', truckController.create);
router.get('/:truckId', truckController.getById);
router.put('/:truckId', truckController.updateById);
router.delete('/:truckId', truckController.deleteById);*/

module.exports = router;

