require('dotenv').config();
const inquirer = require('inquirer');

// const db = require('./index.js');
// const viewAllEmployees = require('./scripts/viewAllEmployees');
// const viewAllRoles = require('./scripts/viewAllRoles');
// const viewAllDepartments = require('./scripts/viewAllDepartments');
// const addDepartment = require('./scripts/addDepartment');
// const addEmployee = require('./scripts/addEmployee');
// const updateEmployeeRole = require('./scripts/updateEmployeeRole');

const DB_PASSWORD = process.env.DB_PASSWORD;
const mysql = require('mysql2');
require('dotenv').config();


// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: DB_PASSWORD,
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );



// Startup Inquirer

function startMenu() {
    inquirer.prompt([
        {
          type: 'list',
          name: 'main_menu',
          message: 'What would you like to do?',
          choices: [
            'View all employees',
            'Add employee',
            'Update employee role',
            'View all roles',
            'View all departments',
            'Add department',
            'Quit']
          
        },
    ]).then((response) => {
        switch (response.main_menu) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Quit':
                break;
        }
    })


}

function viewAllEmployees()  {
    console.log("Fetching all employees.");
    db.query('SELECT * FROM employee', function (err, results) {
        console.log( '\n' );
        console.table(results);
        console.log( 'Press arrow key to continue' );
        console.log( '\n' );
    });
    startMenu();
}

function viewAllDepartments()  {
    console.log("Fetching all departments.");
    db.query('SELECT * FROM department', function (err, results) {
        console.log( '\n' );
        console.table(results);
        console.log( 'Press arrow key to continue' );
        console.log( '\n' );
    });
    startMenu();
}

function viewAllRoles()  {
    console.log("Fetching all roles.");
    db.query('SELECT * FROM role', function (err, results) {
        console.log( '\n' );
        console.table(results);
        console.log( 'Press arrow key to continue' );
        console.log( '\n' );
    });
    startMenu();
}




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

startMenu();



