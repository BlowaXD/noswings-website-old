'use strict';
const express = require('express');

const router = express.Router();

router.get('/', require('./home.js'));
router.get('/login', require('./login.js'));
router.get('/account', require('./account.js'));
router.get('/register', require('./register.js'));

module.exports = router;
