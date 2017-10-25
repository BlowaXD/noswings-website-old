'use strict';

function get(req, res)
{
    const data = {
        user: req.user,
        title: global.translate.USER.ACCOUNT_PAGE.TITLE,
        paypal_callback: global.config.api.post_paypal,
    };

    res.render('user/donate', data);
}

module.exports = get;
