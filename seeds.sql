
INSERT INTO department(id, name)
VALUES (1, 'Human Resources');
INSERT INTO department(id, name)
VALUES (2, 'Production');
INSERT INTO department(id, name)
VALUES (3, 'Finance');

INSERT INTO role(id, title, salary, department_id)
VALUES (1, 'Manager', 70000, 2);
INSERT INTO role(id, title, salary, department_id)
VALUES (2, 'Accountant', 40000, 3);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Susan', 'Ashmore', 1, null);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (2, 'Ray', 'Yang', 1, null);