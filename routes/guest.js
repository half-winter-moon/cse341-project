const express = require('express');
const router = express.Router();

const guestController = require('../controllers/guest');

router.get('/', guestController.getGuests);
router.get('/:id', guestController.getGuest);
router.post('/', guestController.addGuest);


module.exports = router;