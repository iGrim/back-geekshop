const express = require('express')

const userController = require('../controllers/userController')
const router = express.Router();

router.get('/users', userController.findAll);
router.get('/users/:id', userController.findOne);
router.get('/users/:id/edit', userController.findOneEdit);
router.post('/users/find/', userController.findByUsername);
router.post('/users', userController.create);
router.patch('/users/:id', userController.update);
router.delete('/users/:id', userController.destroy);
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
module.exports = router