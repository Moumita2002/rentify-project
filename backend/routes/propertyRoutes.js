const express = require('express');
const { createProperty, getSellerProperties, deleteProperty, getPropertyWithSeller, updateProperty } = require('../controllers/propertyController');
const router = express.Router();
const authmiddleware=require("../middlewares/authMiddleware");

router.post('/create', authmiddleware, createProperty);
router.get('/list', authmiddleware, getSellerProperties);
router.get('/:id', authmiddleware, getPropertyWithSeller); // New route
router.delete('/:id', authmiddleware, deleteProperty);
router.put('/update/:id', authmiddleware, updateProperty);

module.exports = router;
