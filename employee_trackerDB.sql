DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE Table department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE Table role(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE Table employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);


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