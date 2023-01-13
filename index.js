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
            
            'Update employee role',
            'View all roles',
            'View all departments',
            'Add department',
            'Add role',
            'Add employee',
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
            case 'Add role':
                addRole();
                break;
            case 'Quit':
                quit();
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

        db.query(sqlQuery, params, function (err, results) {console.log("Added department " + params)});

        db.query('SELECT * FROM department', function (err, results) {
            console.log( '\n' );
            console.table(results);
            console.log( 'Press arrow key to continue' );
            console.log( '\n' );
        });
        startMenu();
    });
    
}

function addRole()  {

    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of the role?',
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'What is the department ID of the role?',
        },
    ]).then((data) => {
        // console.log(data.title);
        const sqlQuery = 'INSERT INTO role (title, salary, department_id) VALUES (?,?,?);';
        const params = [data.title, data.salary, data.departmentId];

        db.query(sqlQuery, params, function (err, results) {console.log("Added role " + params)});

        db.query('SELECT * FROM role', function (err, results) {
            console.log( '\n' );
            console.table(results);
            console.log( 'Press arrow key to continue' );
            console.log( '\n' );
        });
        startMenu();
    });
}


function updateEmployeeRole()  {
    
    console.log("Update employee role selected.");
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'What is the ID of the employee?',
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the ID of the role?',
        },
    ]).then((data) => {
  
        const sqlQuery = 'UPDATE employee SET role_id = ? WHERE id = ?';
        const params = [data.roleId, data.employeeId];

        db.query(sqlQuery, params, function (err, results) {
            console.log("Updated employee ID " + data.employeeId + " to role ID " + data.roleId)
            viewAllEmployees();
            // console.log( '\n' );
            // console.log( 'Press arrow key to continue' );
            // console.log( '\n' );
        });

        // startMenu();
    })

}

function addEmployee() {

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
            type: 'input',
            name: 'employeeRole',
            message: 'What is their role ID?',
        },
        {
            type: 'input',
            name: 'employeeManager',
            message: 'What is the ID of their manager?',
        },
    ])
    .then((data) => {
        const sqlQuery = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);';
        const params = [data.firstName, data.lastName, data.employeeRole, data.employeeManager];

        console.log("query: " + sqlQuery);
        console.log("params: " + params);

        db.query(sqlQuery, params, function (err, results) {
            console.log("Added employee " + data.firstName);
        });

        db.query('SELECT * FROM employee', function (err, results) {
            console.log( '\n' );
            console.table(results);
            console.log( 'Press arrow key to continue' );
            console.log( '\n' );
        });

        startMenu();

    });
}

function quit() {
    console.log("Quitting.");
    process.exit();
}


// init();
startMenu();