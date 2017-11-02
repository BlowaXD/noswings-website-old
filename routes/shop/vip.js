'use strict';
const request = require('request');
const router = require('express').Router();

router.get('/', (req, res) =>
{
    let data = {
        user: req.user,
        title: global.translate.USER.SHOP_PAGE.TITLE
    };
    return res.render('shop/vip', data);
});

router.post('/', (req, res) =>
{
    const opt = {
        method: 'post',
        json: true,
        url: global.config.api.post_buy_vip,
        body: {PackId: req.body.PackId, character: req.body.Character},
        headers: {'x-access-token': req.user.token}
    };

    request(opt, (err, response, body) =>
    {
        /*
        ** CHECK DU BODY
        */
        res.redirect(req.protocol + '://' + req.get('host') + '/shop');
    });
});

module.exports = router;
