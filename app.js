//require
const mysql = require('mysql');
const inquirer = require('inquirer');


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
  