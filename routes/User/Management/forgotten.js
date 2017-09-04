'use strict';
const validator = require('validator');
const sql = require("mssql");
const fs = require('fs');
const crypto = require('crypto');
const nodemailer = require("nodemailer");

const GET_ACCOUNT = "SELECT TOP 1 Name, Email FROM [dbo].[Account] WHERE [Name] = '";
const UPDATE_VERIF_TOKEN = "UPDATE [opennos].[dbo].[Account] SET [VerificationToken]=N'@veriftoken' WHERE ([Name]='@username')";

async function login(req, res) {
    const account = {
        username: req.body.username,
        email: req.body.email,
    };
    const server = global.config[req.body.server];

    /* Some checks */
    if (!server)
        return res.status(403).send({error: global.translate.WRONG_SERVER});
    if (!validator.isAlphanumeric(account.username))
        return res.status(403).send({error: global.translate.WRONG_USERNAME});
    if (!validator.isEmail(account.email))
        return res.status(403).send({error: global.translate.WRONG_EMAIL});

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

    if (recordset[0].email !== account.email) {
        return res.status(403).send({error: global.translate.WRONG_PASSWORD})
    }

    /* Generate a new VerificationToken */
    const veriftoken = crypto.randomBytes(16).toString('hex');

    /* Await the BD connection & check if username is already taken */
    recordset;
    try {
        await sql.connect(server.db);

        const request = new sql.Request();
        request.input('username', sql.VarChar, account.username);
        request.input('veriftoken', sql.VarChar, veriftoken);
        recordset = await request.query(`${GET_ACCOUNT} @username`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});
    }

    let transport = nodemailer.createTransport(server.email_config);
    let mailOptions = {
        from: {server} + '<' + server.email + '>', // sender address
        to: account.email, // list of receivers
        subject: global.translate.FORGOTTEN_EMAIL_SUBJECT, // Subject line
    };

    let mailhtml = await fs.readFile("../../../mails/mail.html", 'utf8');

    mailhtml.replaceAll("{LOGO}", config.urls.logo);
    mailhtml.replaceAll("{USER}", account.username);
    mailhtml.replaceAll("{EMAIL}", account.email);
    mailhtml.replaceAll("{SERVER}", config.server);
    mailhtml.replaceAll("{BUTTON_LINK}", config.urls.forgotten + VerificationToken);
    mailhtml.replaceAll("{FORUM_LINK}", config.urls.forum);
    mailhtml.replaceAll("{DISCORD_LINK}", config.urls.discord);
    mailhtml.replaceAll("{SITE_LINK}", config.urls.site);

    mailOptions.html += mailhtml;
    recordset = await transporter.sendMail(mailOptions);
    if (recordset) {
        return res.status(500).send({error: global.translate.REGISTRATION_EMAIL_ERROR});
    }

    /* REGISTRATION DONE SUCCESSFULLY */
    return res.status(200).send({success: global.translate.REGISTER_SUCCESSFULL});
    /* WRONG EMAIL */
}

module.exports = login;
