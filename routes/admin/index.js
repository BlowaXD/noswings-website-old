'use strict';
const express = require('express');
const auth_middleware = require('../../middlewares/authMiddleware.js');

const router = express.Router();

router.use(auth_middleware);
router.get('/', require('./dashboard.js'));

module.exports = router;
