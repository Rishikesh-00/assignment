const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController.js');

router.get('/', profileController.getProfile);

module.exports = router;
