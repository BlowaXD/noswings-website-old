const express = require('express');
const sha512 = require('sha512');
const request = require('request');
const Cookies = require("cookies");

const router = express.Router();

/* GET Packs. */
router.get('/', function (req, res) {
    res.render('login', {title: global.translate.TITLE_DASHBOARD});
});

router.get('/dashboard', function (req, res) {
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

router.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password)
        return res.sendStatus(400);

    const hashedPassword = sha512(password).toString('hex');
    const options = {
        url: global.config.api.login_route,
        method: 'post',
        body: { username, hashedPassword, server: global.config.server },
        json: true
    };

    request(options, (error, response, body) => {
        if (error)
            return res.sendStatus(500);

        if (body.error)
            return res.status(403).send(body.error);

        if (!body.success || !body.token)
            return res.sendStatus(500);

        /* Store cookies into a cookie */
        const cookies = new Cookies(req, res);

        cookies.set('token', body.token);
        res.redirect(req.protocol + '://' + req.get('host') + '/dashboard');
    });
});

module.exports = router;
