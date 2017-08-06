'use strict';
const express = require('express');
const router = express.Router();

/* GET Packs. */
router.get('/', function (req, res) {
    res.render('moderator/dashboard', {title: global.translate.TITLE_DASHBOARD});
});

module.exports = router;
