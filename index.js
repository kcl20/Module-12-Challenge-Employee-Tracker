const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

const viewAllEmployees = require('./scripts/viewAllEmployees');
const viewAllRoles = require('./scripts/viewAllRoles');
const viewAllDepartments = require('./scripts/viewAllDepartments');
const addDepartment = require('./scripts/addDepartment');
const addRole = require('./scripts/addRole');
const addEmployee = require('./scripts/addEmployee');

const updateEmployeeRole = require('./scripts/updateEmployeeRole');
const { inherits } = require('util');

const DB_PASSWORD = process.env.DB_PASSWORD;

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



startMenu();

// Query database
// db.query('SELECT * FROM employees', function (err, results) {
//     console.log(results);
//   });