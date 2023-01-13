const inquirer = require('inquirer');
const db = require('./index.js');

function addDepartment()  {

    inquirer
    .prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?',
        },
    ]).then((data) => {

        // console.log(data.departmentName);
        const sqlQuery = 'INSERT INTO department (name) VALUES (?)';
        const params = [data.departmentName];

        db.query(sqlQuery, params, function (err, results) {console.log("Added department " + sqlQuery)});

        db.query('SELECT * FROM department', function (err, results) {
                console.table(results);});
        });
}

module.exports = addDepartment;