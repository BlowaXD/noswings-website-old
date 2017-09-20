'use strict';
const request = require('request');
const router = require('express').Router();

router.get('/', (req, res) => {
    const data = {
        user: req.user,
        title: global.translate.ADMIN.ADD_MONEY.TITLE,
        desc: global.translate.ADMIN.ADD_MONEY.DESC,
    };

    res.render('admin/addmoney', data);
});

router.post('/', async (req, res) => {
    // ADD MONEY
    let money = req.body.money * 500;

    let cash = req.body.money;

    if (cash >= 10 && cash < 30)
    {
        money += (money * (5 / 100));
    }
    else if (cash >= 30 && cash < 50)
    {
        money += (money * (10 / 100));
    }
    else if (cash >= 50 && cash < 100)
    {
        money += (money * (15 / 100));
    }
    else if (cash >= 100)
    {
        money += (money * (20 / 100));
    }
    if (req.body.flooz === 'on') {
        money += (money * (20 / 100));
    }

    // REQUEST
    const opt = {
        method: 'post',
        json: true,
        url: global.config.api.admin.post_add_money,
        body: {
            server: req.user.server,
            character: req.body.character,
            money: money,
        },
        headers: {'x-access-token': req.user.token}
    };

    request(opt, (err, response, body) => {
        /*
        ** CHECK DU BODY
        */
        res.redirect(req.protocol + '://' + req.get('host') + req.originalUrl);
    });
});

module.exports = router;
