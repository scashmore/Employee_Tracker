DROP DATABASE IF EXISTS employee_trackerdb;
CREATE database employee_trackerdb;

USE employee_trackerdb;

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
  PRIMARY KEY (id)
);

CREATE Table employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO department(name)
VALUES ('Human Resources');
INSERT INTO department(name)
VALUES ('Production');
INSERT INTO department(name)
VALUES ('Finance');

INSERT INTO role(title, salary, department_id)
VALUES ('Manager', 70000, 2);
INSERT INTO role(title, salary, department_id)
VALUES ('Accountant', 40000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Susan', 'Ashmore', 1, null);