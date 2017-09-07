'use strict';
const request = require('request');

function get(req, res)
{
    request(global.config.api.get_packs, (err, response, body) => {
        if (err || response.statusCode !== 200)
            return res.render('shop/shop', { packs: [], error: err || `Status code : ${response.statusCode}` });

        try
        {
            res.render('shop/shop', { packs: JSON.parse(body) || [], error: null });
        }
        catch (error)
        {
            res.render('shop/shop', { packs: [], error });
        }
    });
}

module.exports = get;
