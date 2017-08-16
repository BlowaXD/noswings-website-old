const express = require('express');
const request = require('request');
const Cookies = require('cookies');
const crypto = require('crypto');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/*
** --------------------------------------------------------------------------------
** ------------                     Basics routes                      ------------
** --------------------------------------------------------------------------------
*/
router.get('/', function (req, res) {
    const cookies = new Cookies(req, res);

    if (cookies.get('token'))
        return res.redirect(req.protocol + '://' + req.get('host') + '/dashboard');
    res.redirect(req.protocol + '://' + req.get('host') + '/login');
});

router.get('/register', function (req, res) {
    res.render('register', {title: global.translate.TITLE_REGISTER})
});

router.get('/login', function (req, res) {
    const cookies = new Cookies(req, res);

    if (cookies.get('token'))
        return res.redirect(req.protocol + '://' + req.get('host') + '/dashboard');

    res.render('login', {title: global.translate.TITLE_LOGIN});
});

router.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password)
        return res.sendStatus(400);

    const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');
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

/*
** --------------------------------------------------------------------------------
** ------------                 Require authentication                 ------------
** --------------------------------------------------------------------------------
*/
router.use(authMiddleware);

const modules = {
    register: require('./user/register.js'),
    forgotten: require('./user/forgotten.js'),
    password: require('./user/password.js'),
};

router.post('/register', modules.register);
router.post('/password', modules.password);
router.post('/forgotten', modules.forgotten);

router.get('/dashboard', function (req, res) {
    res.render('dashboard', {title: global.translate.TITLE_DASHBOARD});
});

router.get('/recharge', function (req, res) {
    res.render('recharge', {title: global.translate.TITLE_DASHBOARD});
});

router.get('/shop/', function (req, res) {
    res.render('shop', {title: global.translate.TITLE_DASHBOARD});
});

router.get('/user', function (req, res) {
    res.render('user', {title: global.translate.TITLE_USER_MANAGEMENT});
});

module.exports = router;
