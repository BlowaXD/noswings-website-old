'use strict';
const request = require('request');

function get(req, res)
{
    let data = {
        user: req.user,
        title: global.translate.SHOP_PAGE.TITLE
    };

    request(global.config.api.get_packs, (err, response, body) => {
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
}

module.exports = get;
