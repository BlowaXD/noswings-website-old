/**
 ________                     ___________.__       .__       .___
 /  _____/_____    _____   ____\_   _____/|__| ____ |  |    __| _/
 /   \  ___\__  \  /     \_/ __ \|    __)  |  |/ __ \|  |   / __ |
 \    \_\  \/ __ \|  Y Y  \  ___/|     \   |  \  ___/|  |__/ /_/ |
 \______  (____  /__|_|  /\___  >___  /   |__|\___  >____/\____ |
 \/     \/      \/     \/    \/            \/           \/

 */

const sql = require('mssql');
const QUERY_GET_PATCH_LIST = 'SELECT * FROM _GF_Launcher_Patchs;';

async function patch_list(req, res) {
    sql.close();

    let recordset;
    try {
        await sql.connect(config.db);

        const request = new sql.Request();
        recordset = await request.query(`${QUERY_GET_PATCH_LIST}`);
    }
    catch (error) {
        sql.close();
        console.log(error);
        return res.render('patch_list', {error: 'Error in database'});
    }

    recordset = recordset.recordset;
    /* If yes, throw an error */
    if (recordset.length === 0) {
        return res.render('patch_list', {error: 'Error in database'});
    }

    console.error(recordset);
    return res.render('patch_list', {patch: recordset});
}

module.exports = patch_list;
