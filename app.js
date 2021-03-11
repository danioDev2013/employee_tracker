//require
//const mysql = require('mysql');
const inquirer = require('inquirer');
const { ADDRGETNETWORKPARAMS } = require('node:dns');
const { createConnection } = require('node:net');

//connection information for the sql database
//const connection = mysql.createConnection({
    //host: 'localhost',

    // Your port; if not 3306
    //port: 3306,
  
    // Your username
    //user: 'root',
  
    // Your password
    //password: '',
    //database: 'employeesDB',
  //});

const init = () => {
    console.log("Welcome to Chico's Place!!!");
    console.log("Employee Tracker Application");
    start();
}
  
const start = () => {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        //all the actions, including bonus actions just incase I get to them
        choices: [
            "Add New Department",
            "Add New Role",
            "Add New Employee",
            "View all Employees by Department",
            "View all Employees by Role",
            "View all Employees",
            "View Manager",
            "Update Roles",
            "Update Department",
            "Update Employee Manager",
            "Delete a Department",
            "Delete an Employee",
            "Delete a Role",
            "Exit App"
        ]
    })
    .then((response) => {
        console.log(response);
        switch (response.action) {
            case 'Add New Department':
                addNewDepartment();
                break;
            case 'Add New Role':
                addNewRole();
                break;
            case 'Add New Employee':
                addNewEmployee();
                break;
            case 'View all Employees by Department':
                viewEmployeeDep();
                break;
            case 'View all Employees by Role':
                viewEmployeeRole();
                break;
            case 'View all Employees':
                viewEmployee();
                break;
            case 'View Manager':
                viewManager();
                break;
            case 'Update Roles':
                updateRole();
                break;
            case 'Update Department':
                updateDept();
                break;
            case 'Update Employee Manager':
                updateEmpMan();
                break;
            case 'Delete a Department':
                deleteDept();
                break;
            case 'Delete an Employee':
                deleteEmployee();
                break;
            case 'Delete a Role':
                deleteRole();
                break;
            case 'Exit App':
                console.log('Terminating App');
                connection.end();
                break;
        }
    })
}


init();
//functions
//prompts users
//add employees, departments, rows
//view info
//update

//bonus
//update manager
//view manager
//delete departments
//view utilized budget

// connect to the mysql server and sql database
//connection.connect((err) => {
   // if (err) throw err;
    // run the start function after the connection is made to prompt the user
    //start();
  //});
  