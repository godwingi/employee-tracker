DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE all_roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  job_title VARCHAR(100),
  salary INT,
  department_id INT,
  FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  manager VARCHAR(100),
  role_id INT,
  FOREIGN KEY(role_id) REFERENCES all_roles(id)
);

CREATE TABLE manager (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  manager_name VARCHAR(100),
  manager_id INT,
  FOREIGN KEY(manager_id) REFERENCES employees(id)
);


