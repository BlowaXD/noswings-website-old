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
const fs = require('fs');
const ip = require('./ip.js');
const port = require('./port.js');
const multiclient = require('./multiclient.js');
const QUERY_VERIFY_HASH_CLONE = 'SELECT TOP 1 * FROM [dbo].[_GF_Launcher_Patchs] WHERE [Hash] = @hash;';
const QUERY_ADD_PATCH = "INSERT INTO [dbo].[_GF_Launcher_Patchs] ([Hash], [Ip], [Port], [Multiclient]) VALUES (@hash, @ip, @port, @multiclient)";
const QUERY_ADD_PATCH_VALUES = "INSERT INTO [dbo].[_GF_Launcher_Patchs] ([HashId], [Offset], [Value]) VALUES (@hashid, @offset, @data)";

router.post('/patch', function (req, res) {
    fs.readFile(req.file.path, async function (err, filedata) {
        let replacements = [];
        const patchs = {
            ip: req.body.ip,
            port: req.body.port,
            multiclient: req.body.multiclient === 'on'
        };

        console.error(patchs);

        if (!filedata || !patchs.ip || !patchs.port || !patchs.multiclient) {
            fs.unlinkSync(req.file.path);
            return res.sendStatus(400);
        }

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
            fs.unlinkSync(req.file.path);
            console.log(error);
            return res.render('patch', {error: 'Error in database'});
        }

        recordset = recordset.recordset;
        /* If yes, throw an error */
        if (recordset.length !== 0) {
            fs.unlinkSync(req.file.path);
            return res.render('patch', {error: 'Error in database'});
        }


        const patch_ip = ip(filedata, patchs.ip);
        const patch_port = port(filedata, patchs.port);

        if (patch_ip)
            replacements = replacements.concat(patch_ip);
        if (patch_port)
            replacements = replacements.concat(patch_port);

        if (patchs.multiclient !== true) {
            fs.unlinkSync(req.file.path);
            return res.send(replacements);
        }

        const patch_multiclient = multiclient(filedata);

        if (patch_multiclient)
            replacements = replacements.concat(patch_multiclient);

        /* Await the BD connection & UPLOAD A NEW PATCH IF HASH IS NOT TAKEN */
        try {
            const request = new sql.Request();
            request.input('hash', sql.VarChar, hash);
            request.input('ip', sql.VarChar, patchs.ip);
            request.input('port', sql.SmallInt, Number(patchs.port));
            request.input('multiclient', sql.Bit, patchs.multiclient === true ? 1 : 0);
            recordset = await request.query(`${QUERY_ADD_PATCH} ${QUERY_VERIFY_HASH_CLONE}`);
        }
        catch (error) {
            sql.close();
            fs.unlinkSync(req.file.path);
            console.log(error);
            return res.render('patch', {error: 'Error in database'});
        }

        const patchId = recordset.recordset;

        if (!patchId) {
            fs.unlinkSync(req.file.path);
            return res.render('patch', {error: 'Error in database'});
        }

        /* UPLOAD NEW PATCH VALUES */
        for (const i in replacements) {
            try {
                const request = new sql.Request();
                request.input('hashid', sql.BigInt, patchId);
                request.input('offset', sql.BigInt, i.offset);
                request.input('value', sql.SmallInt, i.data);
                recordset = await request.query(`${QUERY_ADD_PATCH_VALUES}`);
            }
            catch (error) {
                sql.close();
                fs.unlinkSync(req.file.path);
                console.log(error);
                return res.render('patch', {error: 'Error in database'});
            }
        }

        return res.render('patch', {success: 'Patch applied successfully'});
    });
});

module.exports = router;
