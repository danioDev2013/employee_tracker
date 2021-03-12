--Seeds for SQL table
USE employeesDB;

INSERT INTO department(dept_name)
VALUES ('Management'),
('Kennel Staff'),
('Customer Service'),
('Groomers'),
('Custodial');

INSERT INTO roles(title, salary, department_id)
VALUES ('CEO', 500000, 1),
('Kennel Attendant', 30000, 2),
('Front Desk Staff', 24000, 3),
('Groomer Lead', 40000, 4),
('Groomer', 30000, 4),
('Grooming Assistant', 24000, 4),
('Kennel Cleaner', 25000, 5),
