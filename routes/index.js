const express = require('express');
const router = express.Router();

/* GET Packs. */
router.get('/', function (req, res) {
    res.render('dashboard', {title: global.translate.TITLE_DASHBOARD});
});

router.get('/recharge', function (req, res) {
    res.render('recharge', {title: global.translate.TITLE_DASHBOARD});
});

router.get('/shop/', function (req, res) {
    res.render('shop', {title: global.translate.TITLE_DASHBOARD});
});

router.get('/register', function (req, res) {
    res.render('register', {title: global.translate.TITLE_REGISTER})
});

router.get('/user', function (req, res) {
    res.render('user', {title: global.translate.TITLE_USER_MANAGEMENT});
});

router.get('/login', function (req, res) {
    res.render('login', {title: global.translate.TITLE_LOGIN});
});

module.exports = router;
