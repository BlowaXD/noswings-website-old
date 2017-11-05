'use strict';
const request = require('request');
const router = require('express').Router();

router.get('/', (req, res) => {
    let data = {
        user: req.user,
        title: global.translate.USER.SHOP_PAGE.TITLE
    };
    const opt = {
        method: 'get',
        url: global.config.api.get_packs,
        headers: {
            'x-access-token': req.user.token
        }
    };

    request(opt, (err, response, body) => {
        if (err || response.statusCode !== 200)
            return res.render('shop/shop', {
                error: err || `Status code : ${response.statusCode}`
            });

        try {
            data.packs = JSON.parse(body) || [];
            data.categories = data.packs
                .map((p, i) => {
                    if (data.packs.findIndex(e => e.CategoryId === p.CategoryId) === i)
                        return p.CategoryId;
                })
                .filter(e => e !== undefined)
                .map(cat => {
                    const elem = data.packs.find(pack => pack.CategoryId === cat);
                    return new Object({
                        name: elem.CName,
                        id: elem.CategoryId
                    });
                });
            data.packs.forEach(pack => {
                if (pack.Description.indexOf('KFC/') !== -1) {
                    const descriptions = pack.Description.split(' ');
                    let description = "";
                    for (const image of descriptions) {
                        if (image.indexOf('KFC/') !== -1) {
                            description += `<img src="https://static.noswings.fr/images/nosmall/${image.substring(4, image.length)}" width="30">`;
                        }
                    }
                    pack.Description = description;
                }
            });
            res.render('shop/shop', data);
        } catch (error) {
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
        body: {
            PackId: req.body.PackId,
            character: req.body.Character
        },
        headers: {
            'x-access-token': req.user.token
        }
    };

    request(opt, (err, response, body) => {
        /*
         ** CHECK DU BODY
         */
        res.redirect(req.protocol + '://' + req.get('host') + '/shop');
    });
});

module.exports = router;