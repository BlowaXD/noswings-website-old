'use strict';
const request = require('request');
const multer = require('multer');
const router = require('express').Router();
const fs = require('fs');
const ip_patcher = require('./patchs/ip.js');
const port_patcher = require('./patchs/port.js');
const multiclient_patcher = require('./patchs/multiclient.js');

router.get('/', (req, res) => {
    const data = {
        user: req.user,
        title: global.translate.ADMIN.HOME_PAGE,
    };

    res.render('admin/patch', data);
});

router.post('/', multer({dest: 'uploads/'}).single('file'), async (req, res) => {
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
        const patch_ip = ip_patcher(filedata, patchs.ip);
        const patch_port = port_patcher(filedata, patchs.port);
        const patch_multiclient = multiclient_patcher(filedata);

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
                server: "NosWings",
                ip: req.body.ip,
                port: req.body.port,
                multiclient: req.body.multiclient === 'on',
                hash: hash,
                patchs: replacements,
            },
            headers: { 'x-access-token': req.user.token }
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
