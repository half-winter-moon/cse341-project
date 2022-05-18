const express = require('express');
const router = express.Router();

router.use('/api-docs', require('./swagger'));
router.use('/user', require('./user'));
router.use('/guest', require('./guest'));

module.exports = router;