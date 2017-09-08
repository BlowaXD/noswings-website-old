'use strict';
const crypto = require('crypto');
const Cookies = require('cookies');
const request = require('request');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('user/login');
});

router.post('/', (req, res) => {
    let url = global.config.api.get_token;
    const hpass = crypto.createHash('sha512')
        .update(req.body.password)
        .digest('hex');

    url += `?server=${global.config.server}`;
    url += `&username=${req.body.username}`;
    url += `&hashedPassword=${hpass}`;
    request.get(url, (err, response, body) => {
        if (err)
        {
            console.log(err);
            return res.redirect(req.protocol + '://' + req.get('host') + '/login');
        }

        /* Parse body */
        let req_res;
        try
        {
            req_res = JSON.parse(body);
        }
        catch (e)
        {
            console.log(err);
        }

        /* Check if token */
        if (!req_res || !req_res.success || !req_res.data)
            return res.redirect(req.protocol + '://' + req.get('host') + '/login');

        /* Store token in cookies */
        const cookies = new Cookies(req, res);

        cookies.set(`${global.config.server}-token`, req_res.data, { maxAge: 7200 });
        return res.redirect(req.protocol + '://' + req.get('host'));
    });
});

module.exports = router;
