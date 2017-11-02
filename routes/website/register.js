'use strict';
const request = require('request');
const requestp = require('request-promise');
const router = require('express').Router();
const reCaptcha = require('recaptcha2');
const recaptcha = new reCaptcha({
    siteKey: '6Lf-Gi0UAAAAAP-kYvvqBv9sVLn0GkGfBD0-gbCm',
    secretKey: '6Lf-Gi0UAAAAAPXVYs2J8kcZJDoG2POKjsuACA5T'
});

router.get('/validate/:validationToken', (req, res) => {
    const opt = {
        method: 'get',
        url: global.config.api.get_validate + req.params.validationToken
    };

    request(opt, (err, response, body) => {
        /*
        ** CHECK DU BODY
        */
        res.redirect(req.protocol + '://' + req.get('host') + '/');
    });
});

router.get('/', (req, res) => {
    const data = {
        title: global.translate.WEBSITE.REGISTER_PAGE.TITLE
    };

    res.render('website/register', data);
});

router.post('/', async (req, res) => {
    try {
        await recaptcha.validateRequest(req);
    }
    catch (error) {
        return res.status(403).json({success: false, error: "Merci de remplir le captcha !"});
    }

    const opt = {
        method: 'post',
        json: true,
        url: global.config.api.post_register,
        body: {
            server: 'NosWings',
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        }
    };

    await requestp(opt).then(function (err, resp, body) {
        res.status(200).json({success: true});
    }).catch(function (err) {
        res.status(500).json(err.error);
    });
});

module.exports = router;
