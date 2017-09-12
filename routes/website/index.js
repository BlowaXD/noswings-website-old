'use strict';
const express = require('express');
const router = express.Router();

router.use('/register', require('./register.js'));
module.exports = router;
