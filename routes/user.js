const express = require('express');
const validator = require('../validation-middleware');
const router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', validator.saveUser, userController.addUser);
router.put('/:id', validator.saveUser, userController.updateUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;