"use strict";

const requestp = require('request-promise');

function get(req, res)
{
    const data = {
        title: global.translate.WEBSITE.RANKING.TITLE,
        description: global.translate.WEBSITE.RANKING.DESC
    };
    res.render('website/ranking', data);
}

async function getRanks(req, res)
{
    const opt = {
        method: 'get',
        url: global.config.api.get_ranking + "/" + req.params.rankingType
    };

    await requestp(opt)
        .then(function (body)
        {
            res.status(200).json({
                success: true,
                data: JSON.parse(body).data
            });
        }).catch(function (err)
        {
            res.status(500).json(err.error);
        });
}

module.exports = {
    get: get,
    getRanks: getRanks
};