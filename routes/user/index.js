'use strict';
const express = require('express');
const auth_middleware = require('../../middlewares/authMiddleware.js');

const router = express.Router();

/* Require authentification */
router.use(auth_middleware);
router.get('/', require('./home.js'));
router.get('/account', require('./account.js'));
router.post('/kick', require('./kick.js'));
router.get('*', require('./home.js'));

module.exports = router;
