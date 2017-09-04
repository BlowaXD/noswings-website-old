const sql = require('mssql');
const validator = require('validator');

const REQUEST_CHECK_ACCOUNT = 'SELECT TOP 1 Authority FROM [dbo].[Account] WHERE [VerificationToken] = @verifToken;';
const REQUEST_VALIDATE_ACCOUNT = "UPDATE [Account] SET [Authority]='0' WHERE [VerificationToken] = @verifToken;";

async function validate(req, res) {
    let validationToken = req.params.validationtoken;

    if (!validator.isAlphanumeric(validationToken))
        return;
    sql.close();
    let recordset;
    try {
        await sql.connect(config.db);

        let request = new sql.Request();
        request.input('verifToken', sql.VarChar, validationToken);
        recordset = await request.query(`${REQUEST_CHECK_ACCOUNT}`);
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});
    }
    recordset = recordset.recordset;

    if (recordset.length === 0)
        return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});

    if (recordset[0].Authority !== -1)
        return res.status(500).send({error: global.translate.ACCOUNT_ALREADY_VALIDATED});

    try {
        const request = new sql.Request();
        request.input('verifToken', sql.VarChar, validationToken);
        await request.query(`${REQUEST_VALIDATE_ACCOUNT}`);
    }
    catch (error) {
        sql.close();
        console.log(error);
        return res.status(500).send({error: global.translate.ERROR_IN_DATABASE});
    }
    sql.close();
    return res.status(200).send({success: "Votre compte a été validé avec succès"});
}

module.exports = validate;