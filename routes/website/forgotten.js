'use strict';
const request = require('request');
const router = require('express').Router();
const reCaptcha = require('recaptcha2');
const recaptcha = new reCaptcha({
    siteKey: '6Lf-Gi0UAAAAAP-kYvvqBv9sVLn0GkGfBD0-gbCm',
    secretKey: '6Lf-Gi0UAAAAAPXVYs2J8kcZJDoG2POKjsuACA5T'
});

router.get('/', (req, res) => {
    const data = {
        title: global.translate.FORGOTTEN_PAGE.TITLE
    };

    res.render('website/forgotten', data);
});

router.post('/', async (req, res) => {
    try {
        await recaptcha.validateRequest(req);
    }
    catch (error) {
        return res.render('website/forgotten', {
            error: "Recaptcha fail"
        });
    }

    const opt = {
        method: 'post',
        json: true,
        url: global.config.api.post_forgotten,
        body: {
            username: req.body.username,
            email: req.body.email,
            ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
        }
    };

    request(opt, (err, response, body) => {
        /*
        ** CHECK DU BODY
        */
        res.redirect(req.protocol + '://' + req.get('host') + '/');
    });
});

module.exports = router;
