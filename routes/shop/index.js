'use strict';
const express = require('express');

const router = express.Router();

router.get('/', require('./shop.js'));
router.get('/recharge', require('./recharge.js'));

module.exports = router;
