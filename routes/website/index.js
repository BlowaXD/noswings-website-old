'use strict';
const express = require('express');
const router = express.Router();

router.use('/register', require('./register.js'));
router.use('/forgotten', require('./forgotten.js'));

module.exports = router;
