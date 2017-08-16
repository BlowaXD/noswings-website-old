'use strict';
const validator = require('validator');
const nodemailer = require("nodemailer");
const sql = require("mssql");
const fs = require('fs');
const crypto = require('crypto');
const config = require('../../config/config.js');

const REGISTER_REQUEST = 'SELECT TOP 1 Name FROM [dbo].[Account] WHERE [Name] = @username;';
const INSERT_USER_REQUEST = 'INSERT INTO dbo.Account (Authority, Name, Password, Email, RegistrationIp, VerificationToken) VALUES (-1, @username, @password, @email, @registrationIp, @veriftoken);';

async function register(req, res) {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirmation = req.body.passwordConfirmation;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    console.error("I'm in");
    console.error("Email : " + email);
    console.error("Username : " + username);
    console.error("password : " + password);
    console.error("passwordConfirmation : " + passwordConfirmation);

    /* Some checks */
    if (!validator.isEmail(email))
        return res.status(403).send({error: global.translate.WRONG_EMAIL});
    if (!validator.isAlphanumeric(username))
        return res.status(403).send({error: global.translate.WRONG_USERNAME_NOT_ALPHA});
    if (!validator.equals(password, passwordConfirmation))
        return res.status(403).send({error: global.translate.WRONG_PASSWORD_CONFIRMATION});
    if (password.length < 6 || password.length > 15)
        return res.status(403).send({error: global.translate.WRONG_PASSWORD_LENGTH});

    /* Await the BD connection & check if username is already taken */
    let recordset;
    try {
        await sql.connect(config.db);

        const request = new sql.Request();
        request.input('username', sql.VarChar, username);
        recordset = await request.query(`${REGISTER_REQUEST}`);
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

    /* Register account */
    let hashedPassword = require('crypto').createHash('sha512').update(password).digest('hex');
    let verificationToken = crypto.randomBytes(16).toString('hex');
    try {
        const request = new sql.Request();

        request.input('username', sql.VarChar, username);
        request.input('password', sql.VarChar, hashedPassword);
        request.input('email', sql.VarChar, email);
        request.input('registrationIp', sql.VarChar, ip);
        request.input('veriftoken', sql.VarChar, verificationToken);
        await request.query(`${INSERT_USER_REQUEST}`);
    }
    catch (error) {
        sql.close();
        console.log(error);
        return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});
    }

    /* SEND MAIL TO CONFIRM */
    let transporter = nodemailer.createTransport(config.smtp);
    let mailOptions = {
        from: global.translate.REGISTRATION_EMAIL_SENDER + '<' + config.server.mail + '>', // sender address
        to: email, // list of receivers
        subject: global.translate.REGISTRATION_EMAIL_SUBJECT, // Subject line
    };

    let mailhtml = fs.readFileSync("./views/mails/mail.html", 'utf8');

    mailhtml.replaceAll("{LOGO}", config.urls.logo);
    mailhtml.replaceAll("{SERVER}", config.server);
    mailhtml.replaceAll("{GREETINGS", global.translate.REGISTRATION_GREETINGS);
    mailhtml.replaceAll("{USER}", username);
    mailhtml.replaceAll("{EMAIL}", email);
    mailhtml.replaceAll("{MESSAGE}", global.translate.REGISTRATION_MESSAGE);
    mailhtml.replaceAll("{BUTTON_DESCRIPTION}", global.translate.REGISTRATION_BUTTON_DESCRIPTION);
    mailhtml.replaceAll("{BUTTON_TITLE}", global.translate.REGISTRATION_BUTTON_TITLE);
    mailhtml.replaceAll("{BUTTON_LINK}", config.urls.validate + verificationToken);
    mailhtml.replaceAll("{FOOTER_DESCRIPTION", global.translate.REGISTRATION_FOOTER_DESCRIPTION);
    mailhtml.replaceAll("{FOOTER_STAFF_NAME}", global.translate.STAFF_NAME);
    mailhtml.replaceAll("{FORUM_LINK}", config.urls.forum);
    mailhtml.replaceAll("{DISCORD_LINK}", config.urls.discord);
    mailhtml.replaceAll("{SITE_LINK}", config.urls.site);
    mailOptions.html = mailhtml;

    recordset = await transporter.sendMail(mailOptions);
    if (recordset) {
        return res.status(500).send({error: global.translate.REGISTRATION_EMAIL_ERROR});
    }

    /* REGISTRATION DONE SUCCESSFULLY */
    return res.status(200).send({success: global.translate.REGISTER_SUCCESSFULL});
}

module.exports = register;
