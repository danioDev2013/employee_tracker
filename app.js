//require
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');


//connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: 'Shadow12!',
    database: 'employeesDB',
  });


// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    //run the start function after the connection is made to prompt the user
    start();
  });

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
            "Update Roles",
            "Update Department",
            "Update Employee Manager",
            "Delete a Department",
            "Delete an Employee",
            "Delete a Role",
            "Exit App"
        ]
    })
    .then((answer) => {
        console.log(answer);
        switch (answer.action) {
            case 'Add New Department':
                addDepartment();
                break;
            case 'Add New Role':
                getDept();
                break;
            case 'Add New Employee':
                getRoles();
                break;
            case 'View all Employees by Department':
                viewEmployeeDept();
                break;
            case 'View all Employees by Role':
                viewEmployeeRoles();
                break;
            case 'View all Employees':
                viewEmployee();
                break;
            case 'Update Roles':
                updateRole();
                break;
            case 'Update Department':
                updateDept();
                break;
            case 'Update Employee Manager':
                updateManager();
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
    });
}



const getDept = () => {
 
}

const getRoles = () => {

}

const addDepartment = () => {
    
}

// View all employees by department 
const viewEmployeeDept = () => {
    connection.query(`SELECT * FROM department`, (err, res) => {
    inquirer
     .prompt({
         name: 'allDepartment',
         type: 'list',
         message: 'Which department would you like to view?',
         choices() {
             const deptArray = [];
             res.forEach(({ dept_name }) => {
                 deptArray.push(dept_name);
             });
             return deptArray;
         },
     }).then((answer) => {
         let query = 
            'SELECT department.dept_name, roles.title, roles.salary, employee.first_name, employee.last_name ' +
            'FROM department ' +
            'INNER JOIN roles ON (department.id = roles.department_id) ' +
            'INNER JOIN employee ON (roles.roles_id = employee.role_id) ' +
            'WHERE (department.dept_name = ?)';
        connection.query(query, [answer.allDepartment], (err, res) => {
            if (err) throw err
            console.log(`${res.length} matches found!`);
            console.log('Viewing Employees By Department');
            console.table(res);
            start();
            }
        );

     });

    });
};
    

const viewEmployeeRoles = () => {

}

//view all employees
const viewEmployee = () => {
    let query =
      'SELECT * ' + 'FROM employee ' + 
      'INNER JOIN roles ON employee.role_id = roles.roles_id ' +
      'INNER JOIN department ON roles.department_id = department.id;';
    connection.query(query, (err, res) => {
        if (err) throw err
        console.log('Viewing All Employees');
        console.table(res);
    })
}

const updateRole = () => {
    
}

const updateDept = () => {
    
}

const updateManager = () => {
    
}

const deleteDept = () => {
    
}

const deleteEmployee = () => {
    
}

const deleteRole = () => {

}

init();

  