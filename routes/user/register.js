'use strict';

function get(req, res)
{
    const data = {
        title: global.translate.REGISTER_PAGE.TITLE
    };

    res.render('user/register', data);
}

module.exports = get;
