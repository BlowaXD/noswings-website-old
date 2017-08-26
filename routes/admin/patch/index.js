/**
 ________                     ___________.__       .__       .___
 /  _____/_____    _____   ____\_   _____/|__| ____ |  |    __| _/
 /   \  ___\__  \  /     \_/ __ \|    __)  |  |/ __ \|  |   / __ |
 \    \_\  \/ __ \|  Y Y  \  ___/|     \   |  \  ___/|  |__/ /_/ |
 \______  (____  /__|_|  /\___  >___  /   |__|\___  >____/\____ |
 \/     \/      \/     \/    \/            \/           \/

 */

const express = require('express');
const router = express.Router();

const sql = require('mssql');
const ip = require('./ip.js');
const port = require('./port.js');
const multiclient = require('./multiclient.js');
const QUERY_VERIFY_HASH_CLONE = 'SELECT TOP 1 Name FROM [dbo].[_GF_Launcher_Patchs] WHERE [Hash] = @hash;';
const QUERY_PATCH = "INSERT INTO [dbo].[_GF_Launcher_Patchs] ([Hash], [Ip], [Port], [Multiclient]) VALUES ('@hash', '@ip', '@port', '@multiclient')";
const QUERY_PATCHS_VALUES = "INSERT INTO [dbo].[_GF_Launcher_Patchs] ([HashId], [Offset], [Value]) VALUES ('@hashid', '@offset', '@data')";

router.post('/patch', function (req, res) {
    fs.readFile(req.files.nostaleX.path, async function (err, filedata) {
        let replacements = [];
        const filedata = req.body.filedata.data;
        const patchs = {
            ip: global.config['NosWings'].ip,
            port: global.config['NosWings'].port,
            multiclient: global.config['NosWings'].multiclient
        };

        if (!filedata || !patchs.ip || !patchs.port || !patchs.multiclient)
            return res.sendStatus(400);


        const hash = require('crypto').createHash('md5').update(filedata).digest('hex');
        sql.close();
        /* CHECK IF HASH IS ALREADY TAKEN */
        let recordset;
        try {
            await sql.connect(config.db);

            const request = new sql.Request();
            request.input('hash', sql.VarChar, hash);
            recordset = await request.query(`${QUERY_VERIFY_HASH_CLONE}`);
        }
        catch (error) {
            sql.close();
            console.log(error);
            return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});
        }

        recordset = recordset.recordset;
        /* If yes, throw an error */
        if (recordset.length !== 0)
            return res.status(403).send({error: global.translate.USER_ALREADY_EXIST});


        const patch_ip = ip(filedata, patchs.ip);
        const patch_port = port(filedata, patchs.port);

        if (patch_ip)
            replacements = replacements.concat(patch_ip);
        if (patch_port)
            replacements = replacements.concat(patch_port);

        if (patchs.multiclient !== true)
            return res.send(replacements);

        const patch_multiclient = multiclient(filedata);

        if (patch_multiclient)
            replacements = replacements.concat(patch_multiclient);

        /* Await the BD connection & UPLOAD A NEW PATCH IF HASH IS NOT TAKEN */
        try {
            const request = new sql.Request();
            request.input('hash', sql.VarChar, hash);
            request.input('ip', sql.VarChar, hash);
            request.input('port', sql.smallint, hash);
            request.input('multiclient', sql.bit, patchs.multiclient === true ? 1 : 0);
            recordset = await request.query(`${REGISTER_REQUEST}`);
        }
        catch (error) {
            sql.close();
            console.log(error);
            return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});
        }


        /* UPLOAD NEW PATCH VALUES */
    });
});

module.exports = router;
