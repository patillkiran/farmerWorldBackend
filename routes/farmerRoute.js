const express = require('express');
const farmerController = require('./../controllers/farmerController');

const router = express.Router();


router.post('/getAllFarmers', farmerController.getAllFarmers);
router.post('/createFarmer', farmerController.createFarmer);
router.get('/getFarmer/:farmerid', farmerController.getFarmer);
router.patch('/updateFarmer/:farmerid', farmerController.updateFarmer);
router.delete('/deleteFarmer/:farmerid', farmerController.deleteFarmer);


module.exports = router;
