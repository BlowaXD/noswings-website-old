'use strict';
const request = require('request');
const router = require('express').Router();

router.get('/', (req, res) => {
    let data = {
        user: req.user,
        title: global.translate.SHOP_PAGE.TITLE
    };
    const opt = {
        method: 'get',
        url: global.config.api.get_packs,
        headers: { 'x-access-token': req.user.token }
    };

    request(opt, (err, response, body) => {
        if (err || response.statusCode !== 200)
            return res.render('shop/shop', { packs: [], error: err || `Status code : ${response.statusCode}` });

        try
        {
            data.packs = JSON.parse(body) || [];
            data.error = null;
            res.render('shop/shop', data);
        }
        catch (error)
        {
            data.packs = [];
            data.error = error;
            res.render('shop/shop', data);
        }
    });
});

router.post('/', (req, res) => {
    const opt = {
        method: 'post',
        json: true,
        url: global.config.api.post_buy,
        body: { PackId: req.body.PackId, character: 'DarkyZ' },
        headers: { 'x-access-token': req.user.token }
    };

    request(opt, (err, response, body) => {
        /*
        ** CHECK DU BODY
        */
        res.redirect(req.protocol + '://' + req.get('host') + '/shop');
    });
});

module.exports = router;
