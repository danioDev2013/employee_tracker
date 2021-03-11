//require
//const mysql = require('mysql');
const inquirer = require('inquirer');

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
    })
}
start();
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
  