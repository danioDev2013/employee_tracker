--Seeds for SQL table
USE employeesDB;

INSERT INTO department (dept_name)
VALUES ('Management'),
('Kennel Staff'),
('Customer Service'),
('Groomers'),
('Custodial');

INSERT INTO roles (title, salary, department_id)
VALUES ('CEO', 500000, 1),
('Manager', 50000, 1),
('Kennel Attendant Lead', 30000, 2),
('Kennel Assistant', 24000, 2),
('Front Desk Staff', 24000, 3),
('Groomer Lead', 40000, 4),
('Groomer', 30000, 4),
('Grooming Assistant', 24000, 4),
('Dog Bather', 20000, 4),
('Kennel Cleaner', 25000, 5),
('Dog Play Area Cleaner', 2500, 5),
('Accountant', 40000, 6);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Hubert','Farnsworth', 1, NULL),
('Turanga', 'Leela', 2, 1),
('Zapp', 'Brannigan', 3, 2),
('Kif', 'Kroker', 4, 3),
('Amy', 'Wong', 5, 2),
('John', 'Zoidberg', 6, 2),
('Robot', 'Santa', 7, 6),
('Lord', 'Nibbler', 8, 6),
('Philip', 'Fry', 9, 4),
('Bender', 'Rodriguez', 10, 2),
('Brain', 'Slugs', 11, 2),
('Hermes', 'Conrad', 12, 1);



