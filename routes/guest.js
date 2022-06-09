const express = require('express');
const validator = require('../validation-middleware');
const router = express.Router();

const guestController = require('../controllers/guest');
 
router.get('/', guestController.getGuests);
router.get('/:id', guestController.getGuest);
router.post('/', validator.saveGuest, guestController.addGuest);
router.put('/:id', validator.saveGuest, guestController.updateGuest);
router.delete('/:id', guestController.deleteGuest);


module.exports = router;