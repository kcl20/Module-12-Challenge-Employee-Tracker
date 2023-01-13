const inquirer = require('inquirer');
const db = require('./index.js');

function viewAllEmployees()  {

    console.log("Fetching all employees.");

    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
    });

  
}

module.exports = viewAllEmployees;