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

    res.render('admin/patch', data);
});

router.post('/', async (req, res) => {
    fs.readFile(req.file.path, async function (err, filedata) {
        let replacements = [];
        const patchs = {
            ip: req.body.ip,
            port: req.body.port,
            multiclient: req.body.multiclient === 'on'
        };

        if (!filedata || !patchs.ip || !patchs.port || !patchs.multiclient) {
            fs.unlinkSync(req.file.path);
            return res.sendStatus(400);
        }

        const hash = require('crypto').createHash('md5').update(filedata).digest('hex');
        const patch_ip = ipPatcher(filedata, patchs.ip);
        const patch_port = portPatcher(filedata, patchs.port);
        const patch_multiclient = multiclientPatcher(filedata);

        if (patch_ip)
            replacements = replacements.concat(patch_ip);
        if (patch_port)
            replacements = replacements.concat(patch_port);
        if (patch_multiclient)
            replacements = replacements.concat(patch_multiclient);

        const opt = {
            method: 'post',
            json: true,
            url: global.config.api.admin.post_patch,
            body: {
                ip: req.body.ip,
                port: req.body.port,
                multiclient: req.body.multiclient === 'on',
                patchs: replacements,
            }
        };

        request(opt, (err, response, body) => {
            fs.unlinkSync(req.file.path);
            /*
            ** CHECK DU BODY
            */
            res.redirect(req.protocol + '://' + req.get('host') + '/');
        });
    });
});

module.exports = router;
