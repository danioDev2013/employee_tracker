//require
const mysql = require('mysql');
const inquirer = require('inquirer');

//connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: '',
    database: 'employeesDB',
  });
  

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
connection.connect((err) => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  