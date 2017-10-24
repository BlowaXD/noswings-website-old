"use strict";

function get(req, res)
{
    const data = {
        title: global.translate.WEBSITE.RANKING.TITLE,
        description: global.translate.WEBSITE.RANKING.DESC
    };
    res.render('website/ranking', data);
}

module.exports = get;