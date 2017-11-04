"use strict";

function get(req, res)
{
    const data = {
        title: global.translate.WEBSITE.RANKING.TITLE,
        description: global.translate.WEBSITE.RANKING.DESC,
        data: global.online
    };
    res.render('website/status', data);
}

module.exports = get;