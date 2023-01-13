const db = require('./index.js');

function viewAllDepartments()  {

    console.log("Fetching all departments.");

    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
    });


}

module.exports = viewAllDepartments;