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
    user: '',
  
    // Your password
    password: '',
    database: 'employeesDB',
  });


// connect to the mysql server and sql database
connection.connect((err) => {
    if (err) throw err;
    //run the start function after the connection is made to prompt the user
    init();
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

//grab roles for add employee
getRoles = () => {
    let rId = [];
    let rName = [];
    let query = 
        'SELECT roles_id, title FROM roles;';
    connection.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({ roles_id }) => {
            rId.push(roles_id);
        });
        res.forEach(({ title }) => {
            rName.push(title);
        });
        addEmployee(rId, rName);
    });
};

//gets departments for adding role
const getDept = () => {
    let deptID = [];
    let deptName = [];

    connection.query('SELECT * FROM department', (err,res) => {
        if (err) throw err;

        res.forEach(({ id }) => {
            deptID.push(id);
        });

        res.forEach(({ dept_name }) => {
            deptName.push(dept_name);
        });

        addRole(deptID, deptName)
    });
};

//add department
const addDepartment = () => {
    connection.query(`SELECT * FROM department`, (err, res) => {
        inquirer
            .prompt({
                    name: 'deptsName',
                    type: 'input',
                    message: 'What is the name of the department you would like to add?',
            }).then((answer) => {
                let dept = answer.deptsName;

                let query = 
                    'INSERT INTO department(dept_name) ' +
                    'VALUES(?)';
                connection.query(query, [dept], (err, res) => {
                    if (err) throw err
                    console.log(`Department was added!`);
                    start();
                })
            });
    })
}

//add Role
const addRole = (deptID, deptName) => {
    let id = "";

    inquirer
        .prompt([
            {
                name: 'roleName',
                type: 'input',
                message: 'What is the name of this role?',
                validate: function (answer) {
                    if (answer === "") {
                        return console.log("Role is needed!");
                    } else {
                        return true;
                    }
                }
            }, {
                name: 'salary',
                type: 'input',
                message: 'What is the salary for this role?',
                validate: function (answer) {
                    if (answer === "") {
                        return console.log("Salary is needed!");
                    } else {
                        return true;
                    }
                }
            }, {
                name: 'deptChoice',
                type: 'list',
                message: 'What is the department for this role?',
                choices: deptName
            },
        ]).then((answer) => {
            for (let i = 0; i < deptID.length; i++) {
                if (answer.deptChoice === deptName[i]) {
                    id += deptID[i]
                }
            };

            let query = 
            'INSERT INTO roles(title, salary, department_id)' +
            'VALUES(?, ?, ?)';

            connection.query(query, [answer.roleName, answer.salary, parseInt(id)], (err, res) => {
            if (err) throw err
            console.log('Role Added!');
            start();
            }
            );
        });
};

//add employee
const addEmployee = (rId, rName) => {
    connection.query(`SELECT empl_id, first_name FROM employee`, (err, res) => {
        let rID = "";
        let managerID = "";

        let employeeName = [];
        let emplID = [];
        


        res.forEach(({ first_name }) => {
            employeeName.push(first_name);
        });

        res.forEach(({ empl_id }) => {
            emplID.push(empl_id);
        });

        inquirer
            .prompt([
                {
                    name: 'firstName',
                    type: 'input',
                    message: 'What is the employees first name you would like to add?'
                }, {
                    name: 'lastName',
                    type: 'input',
                    message: 'What is the employees last name?'
                },
                {
                    name: 'role',
                    type: 'list',
                    message: 'What is the employees role?',
                    choices: rName
                }, 
                {
                    name: 'manager',
                    type: 'list',
                    message: 'Who is this employees Manager',
                    choices: employeeName
                },
            ]).then((answer) => {
                let firstN = answer.firstName;
                let lastN = answer.lastName;

                for (var i = 0; i < rId.length; i++) {
                    if (answer.role === rName[i]) {
                        rID += rId[i]
                    }
                };

                for (var i = 0; i < employeeName.length; i++) {
                    if (answer.manager === employeeName[i]) {
                        managerID += emplID[i]
                    }
                };

                let query = 
                    'INSERT INTO employee(first_name, last_name, role_id, manager_id) ' +
                    'VALUES(?, ?, ?, ?)';
                connection.query(query, [firstN, lastN, parseInt(rID), parseInt(managerID)],
                    (err, res) => {
                        if (err) throw err
                        console.log('Employee Added!');
                        start();
                    })
            })
    })
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

//View all employees by roles
const viewEmployeeRoles = () => {
    connection.query(`SELECT * FROM roles`, (err, res) => {
        inquirer
          .prompt({
            name: 'allRoles',
            type: 'list',
            message: 'Which Roles would you like to view?',
            choices() {
                const roleArray = [];
                res.forEach(({ title }) => {
                    roleArray.push(title);
                });
                return roleArray;
            },
        }).then((answer) => {
            let query = 
                'SELECT roles.title, roles.salary, employee.first_name, employee.last_name, department.dept_name ' +
                'FROM roles ' +
                'INNER JOIN employee ON (employee.role_id = roles.roles_id) ' +
                'INNER JOIN department ON (roles.department_id = department.id) ' +
                'WHERE (roles.title = ?);';
            connection.query(query, [answer.allRoles], (err, res) => {
                if (err) throw err
                console.log(`${res.length} matches found!`);
                console.log('Viewing Employees By Roles');
                console.table(res);
                start();
                }
            );

        });

    });
};

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
        start();
    })
}

//update role
const updateRole = () => {
    connection.query(`SELECT roles_id, title FROM roles`, (err, res) => {
        console.table(res);
        inquirer
          .prompt([
            {
            name: 'roleID',
            type: 'input',
            message: 'Which Role ID do you want to update?'
            }, {
            name: 'roleUpdate',
            type: 'input',
            message: 'What will the role be updated too?'
            },
        ]).then((answer) = () => {
              let newRole = answer.roleUpdate;
              let idRole = answer.roleID;

            

              let query = 
                'UPDATE roles SET title = ? WHERE roles_id = ?;';
              connection.query(query, [newRole, idRole], (err, res) => {
                  if (err) throw err
                  console.log('Role Updated!');
                  start();
              })
          });
    });
}

//update department
const updateDept = () => {
    connection.query(`SELECT id, dept_name FROM department`, (err, res) => {
        console.table(res);
        inquirer
            .prompt([
                {
                    name: 'chooseDept',
                    type: 'input',
                    message: 'Based on the Table, Enter the Department ID you would like to update:'
                }, {
                    name: 'updateDept',
                    type: 'input',
                    message: 'What will the title of this department be?'
                },
            ]).then((answer) => {
                let deptID = answer.chooseDept;
                let deptUpdate = answer.updateDept;

                let query = 
                    'UPDATE department SET dept_name = ? WHERE id = ?;';
                connection.query(query, [deptUpdate, deptID], (err, res) => {
                    if (err) throw err
                    console.log('Department Updated!');
                    start();
                })
            })
    })
}

//updated manager
const updateManager = () => {
    connection.query(`SELECT empl_id, first_name, last_name FROM employee`,
        (err, res) => {
            console.table(res);
            inquirer
                .prompt([
                    {
                        name: 'emplID',
                        type: 'input',
                        message: 'Based on the table, enter the ID of the employee you would like to update:',
                    },
                    {
                        name: 'managerID',
                        type: 'input',
                        message: 'Based on the table, enter the employee ID of the manager:',
                    },

                ]).then((answer) => {

                    let query =
                        "UPDATE employee SET manager_id = ? WHERE role_id = ?;";
                    connection.query(query, [answer.managerID, answer.emplID],
                        (err, res) => {
                            if (err) throw err
                            console.log(`Employee Manager Updated`);
                            start();
                        }
                    );
                });
        });
}

//delete department
const deleteDept = () => {
    connection.query(`SELECT * FROM department`,
    (err, res) => {
        console.table(res);

        inquirer
            .prompt([
                {
                    name: 'deptID',
                    type: 'input',
                    message: 'Based on the table, enter the ID of the department you would like to delete:',
                },
            ]).then((answer) => {
                connection.query('DELETE FROM department WHERE id = ?', [answer.deptID],
                    (err, res) => {
                        if (err) throw err;
                        console.log('Department Deleted');
                        start();
                    }
                );
            });
    });
};

const deleteEmployee = () => {
    connection.query(`SELECT empl_id, first_name, last_name FROM employee`,
    (err, res) => {
        console.table(res);

        inquirer
            .prompt([
                {
                    name: 'employeeID',
                    type: 'input',
                    message: 'Based on the table, enter the ID of the employee you wish to delete:',

                },
            ]).then((answer) => {


                connection.query('DELETE FROM employee WHERE empl_id = ?', [answer.employeeID],
                    (err, res) => {
                        if (err) throw err
                        console.log('Employee Deleted!');
                        start();
                    }
                );
            });
    }); 
}

//delete role
const deleteRole = () => {
    connection.query(`SELECT roles_id, title FROM roles`,
        (err, res) => {
            console.table(res);

            inquirer
                .prompt([
                    {
                        name: 'roleID',
                        type: 'input',
                        message: 'Based on the table, enter the ID of the role you would like to delete:',

                    },
                ]).then((answer) => {


                    connection.query('DELETE FROM roles WHERE roles_id = ?', [answer.roleID],
                        (err, res) => {
                            if (err) throw err
                            console.log('Role Deleted');
                            start();
                        }
                    );
                });
        });
};



  
