INSERT INTO departments (name)
VALUES ("Admin"),
       ("Sales"),
       ("Finance"),
       ("Service"),
       ("Hardware");

INSERT INTO all_roles (job_title, salary, department_id)
VALUES ("secretary", 50000, 1),
       ("accountant", 70000, 3),
       ("lumber consultant", 60000, 5),
       ("sales lead", 70000, 2),
       ("customer care", 55000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tina", "Turner", 1, 1),
       ("Jiminey", "Cricket", 2, NULL),
       ("Princess", "Jasmine", 3, NULL),
       ("Elizabeth", "Swann", 4, 4),
       ("Zack", "Fulton", 5, NULL);