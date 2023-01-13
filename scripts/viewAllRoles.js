const db = require('./index.js');

function viewAllRoles()  {

    console.log("Fetching all roles.");

    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
    });


}

module.exports = viewAllRoles;