-- Drop is employeesDB exists
DROP DATABASE IF EXISTS employeesDB;

--Create employees database
CREATE DATABASE employeesDB;
USE employeesDB;

--Create department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    --holds dept name
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Creates roles table
CREATE TABLE roles (
    --roles id
    roles_id INT NOT NULL AUTO_INCREMENT,
    --holds role title
    title VARCHAR(30) NOT NULL,
    --holds role salary 
    salary DECIMAL(9,2),
    --holds reference to department role belongs to
    department_id INT,
    PRIMARY KEY (r_id)
);

--Creates employee table
CREATE TABLE employee {
    -- id
    id INT NOT NULL AUTO_INCREMENT,
    -- holds employee first name
    first_name VARCHAR(30) NOT NULL,
    -- holds employees last name
    last_name VARCHAR(30) NOT NULL,
    -- holds reference to role employee has
    role_id INT,
    --  holds reference to another employee that manages the employee being Created
    manager_id INT,
    PRIMARY KEY (empl_id)
};