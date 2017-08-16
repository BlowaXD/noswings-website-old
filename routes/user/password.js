'use strict';
const validator = require('validator');
const sql = require('mssql');
const jwt = require('jsonwebtoken');

const UPDATE_PASSWORD = "UPDATE [dbo].[Account] SET [Password] =";
const GET_ACCOUNT = "SELECT TOP 1 Name FROM [dbo].[Account] WHERE [Name] = ";

async function login(req, res) {
    const account = {
        username: req.body.username,
        password: req.body.password,
        newPass: req.body.newPass,
        newPassConfirmation: req.body.newPassConfirmation
    };
    const server = global.config[req.body.server];

    /* Some checks */
    if (!server)
        return res.status(403).send({error: global.translate.WRONG_SERVER});
    if (!validator.isAlphanumeric(account.password))
        return res.status(403).send({error: global.translate.WRONG_PASSWORD});
    if (!validator.isAlphanumeric(account.username))
        return res.status(403).send({error: global.translate.WRONG_USERNAME});
    if (validator.equals(account.password, account.newPass))
        return res.status(403).send({error: global.translate.WRONG_PASSWORD_EQUALS});
    if (!validator.equals(account.newPass, account.newPassConfirmation))
        return res.status(403).send({error: global.translate.WRONG_PASSWORD_CONFIRMATION});

    /* Await the BD connection & check if username is already taken */
    let recordset;
    try {
        await sql.connect(server.db);

        const request = new sql.Request();
        request.input('username', sql.VarChar, account.username);
        recordset = await request.query(`${GET_ACCOUNT} @username`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});
    }

    /* If yes, throw an error */
    if (recordset.length === 0)
        return res.status(403).send({error: global.translate.USER_DOES_NOT_EXIST});

    if (recordset[0].password !== account.hashedPassword)
        return res.status(403).send({error: global.translate.AUTHENTICATED});
    /*
    **
    */
    try {
        const request = new sql.Request();
        request.input('username', sql.VarChar, account.username);
        request.input('newPass', sql.VarChar, account.newPass);
        await request.query(`${UPDATE_PASSWORD} @password WHERE [Name] = @username`);
    }
    catch (error)
    {
        console.log(error);
        return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});
    }
    return res.status(200).send({success: global.translate.PASSWORD_SUCCESSFULLY_CHANGED});
    /* WRONG PASSWORD */
}

module.exports = login;
