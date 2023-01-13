const db = require('./index.js');

function viewAllEmployees()  {

    console.log("view all employees");

    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
    });


}

module.exports = viewAllEmployees;