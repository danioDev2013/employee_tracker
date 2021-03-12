DROP DATABASE IF EXISTS employeesDB;

CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT primary key,
    dept_name VARCHAR(30)
);

CREATE TABLE roles (
    r_id INT NOT NULL AUTO_INCREMENT primary key,
    role_name VARCHAR(30),
    role_salary DECIMAL(9,2),
    department_id INT
);

CREATE TABLE employee {
    empl_id INT NOT NULL AUTO_INCREMENT primary key,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT
};