const inquirer = require('inquirer');
const db = require('./index.js');


function addEmployee()  {

    // get all roles and put title into array
    const roleChoices = [];
    db.query('SELECT title FROM role', function (err, results) {
        results.forEach(function (element) {
            roleChoices.push(element.title);
        });
        // console.log(roleChoices);
    });

    // get all managers (employees with no manager ID) and put their names into array
    const managers = ['None, this employee is a lead'];
    db.query('SELECT first_name, last_name FROM employee', function (err, results) {
        results.forEach(function (element) {
            managers.push(element.first_name + " " + element.last_name);
        });
        // console.log(managers);
    });


    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'list',
            name: 'employeeRole',
            message: 'What is their role?',
            choices: roleChoices,
        },
        {
            type: 'list',
            name: 'employeeManager',
            message: 'Who is their manager?',
            choices: managers,
        },
    ])
    .then((data) => {

        

        // lookup role ID
        let roleID = null;
        db.query('SELECT id FROM role WHERE title = ?', data.employeeRole, function (err, results) {
            console.log("found role ID " + results[0].id);
            roleID = results[0].id;
        });

        // lookup Manager ID (if applicable)
        let managerID = null;
        if (data.employeeManager != 'None, this employee is a lead') {
            db.query('SELECT id FROM employee WHERE first_name = ? AND last_name = ?', data.employeeManager.split(" "), function (err, results) {
                console.log("found manager ID " + results[0].id);
                managerID = results[0].id;
            });
        }



        const sqlQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?);';
        const params = `"${data.firstName}", "${data.lastName}", ${roleID}, ${managerID}`;

        console.log(sqlQuery);
        console.log(params);

        // db.query(sqlQuery, params, function (err, results) {
        //     console.log("Added employee " + data.firstName)
        // });

        db.query('SELECT * FROM employee', function (err, results) {
                console.table(results);});

        });


}

module.exports = addEmployee;