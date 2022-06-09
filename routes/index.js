const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.use('/api-docs', require('./swagger'));
router.use('/user', requiresAuth(), require('./user'));
router.use('/guest', requiresAuth(), require('./guest'));

module.exports = router;