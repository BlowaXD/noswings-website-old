'use strict';
const express = require('express');
const router = express.Router();

router.get('/fr', function(req, res){
    res.cookie('i18n', 'fr');
    res.redirect('/')
});
router.get('/en', function(req, res){
    res.cookie('i18n', 'en');
    res.redirect('/')
});
router.get('/es', function(req, res){
    res.cookie('i18n', 'es');
    res.redirect('/')
});
router.get('/', require('./home.js'));
router.get('/ranking', require('./ranking.js').get);
router.get('/ranks/:rankingType', require('./ranking.js').getRanks);

router.use('/login', require('./login.js'));
router.use('/register', require('./register.js'));
router.use('/forgotten', require('./forgotten.js'));

module.exports = router;
