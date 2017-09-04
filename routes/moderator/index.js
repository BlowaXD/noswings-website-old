'use strict';
const express = require('express');

const router = express.Router();

router.get('/', require('./dashboard.js'));

module.exports = router;
