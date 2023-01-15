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

INSERT INTO employees (first_name, last_name, manager, role_id)
VALUES ("Tina", "Turner", NULL, 1),
       ("Jiminey", "Cricket","Tina Turner", 2),
       ("Princess", "Jasmine","Zack Fulton", 3),
       ("Elizabeth", "Swann","Zack Fulton", 4),
       ("Zack", "Fulton", NULL, 5);

INSERT INTO manager (manager_name, manager_id)
VALUES ("Tina Turner", 1),
       ("Zack Fulton", 5)