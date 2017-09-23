'use strict';

function get(req, res)
{
    let data = {
        user: req.user,
        title: global.translate.ADMIN.HOME_PAGE.TITLE,
        desc: global.translate.ADMIN.HOME_PAGE.DESC,
    };
    res.render('admin/dashboard', data);
}

module.exports = get;
