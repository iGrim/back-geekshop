const express = require('express')
const ItemsController = require('../controllers/Items')
const router = express.Router();
router.get('/', ItemsController.findAll);
router.get('/:id', ItemsController.findOne);
router.post('/', ItemsController.create);
router.patch('/:id', ItemsController.update);
router.delete('/:id', ItemsController.destroy);
module.exports = router