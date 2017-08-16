const mssql = require('mssql');
const validator = require('validator');

const REQUEST_CHECK_ACCOUNT = "SELECT TOP(1) [Authority] from [opennos].[dbo].[Account] WHERE ([VerificationToken]='@veriftoken');";
const REQUEST_VALIDATE_ACCOUNT = "UPDATE TOP(1) [opennos].[dbo].[Account] SET [Authority]='0' WHERE ([VerificationToken]='@veriftoken');";

async function validate(req, res) {
    let validationToken = req.params.validationtoken;
    if (!validator.isAlphanumeric(validationToken))
        return;

    let recordset;
    try {
        await sql.connect(config.db);

        const request = new sql.Request();
        request.input('validationToken', sql.VarChar, validationToken);
        recordset = await request.query(`${REQUEST_CHECK_ACCOUNT}`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});
    }

    if (recordset.length === 0)
        return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});

    if (recordset[0].Authority !== "-1")
        return res.render('error', {
            success: global.translate.ACCOUNT_ALREADY_VALIDATED
        });

    try {
        await sql.connect(config.db);

        const request = new sql.Request();
        request.input('validationToken', sql.VarChar, validationToken);
        recordset = await request.query(`${REQUEST_VALIDATE_ACCOUNT}`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});
    }

    if (recordset.length === 0)
        return res.render('error', {success: global.translate.ACCOUNT_SUCCESSFULLY_VALIDATED});
}

module.exports = validate;