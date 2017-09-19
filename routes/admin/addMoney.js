'use strict';
const request = require('request');
const router = require('express').Router();
const ip_patcher = require('./patchs/ip.js');
const port_patcher = require('./patchs/port.js');
const multiclient_patcher = require('./patchs/multiclient.js');

router.get('/', (req, res) => {
    const data = {
        title: global.translate.ADMIN.HOME_PAGE,
    };

    res.render('admin/addMoney', data);
});

router.post('/', async (req, res) => {
    // ADD MONEY
    let money = req.body.money;

    if (money <= 10) {
    }
    else if (money <= 30) {
        money *= (5 / 100);
    }
    else if (money <= 50) {
        money *= (10 / 100);
    }
    else if (money <= 50) {
        money *= (15 / 100);
    }
    else if (money <= 100) {
        money *= (20 / 100);
    }
    if (req.body.flooz === 'on') {
        money *= (15 / 100);
    }

    // REQUEST
    const opt = {
        method: 'post',
        json: true,
        url: global.config.api.admin.post_add_money,
        body: {
            server: req.user.server,
            character: req.body.ip,
            money: money,
        },
        headers: {'x-access-token': req.user.token}
    };

    request(opt, (err, response, body) => {
        /*
        ** CHECK DU BODY
        */
        res.redirect(req.protocol + '://' + req.get('host') + '/' + res.originalUrl);
    });
});

module.exports = router;
