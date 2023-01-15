SELECT 
employees.id, employees.first_name, employees.last_name, employees.manager, employees.role_id, all_roles.job_title, all_roles.salary, all_roles.department_id
FROM employees
JOIN all_roles ON employees.role_id = all_roles.id;

SELECT manager.manager_name, manager.manager_id
FROM manager
JOIN employees ON manager.manager_id = employees.id


-- SELECT 
-- employees.id, employees.first_name, employees.last_name, employees.role_id, all_roles.job_title, all_roles.salary, all_roles.department_id, manager.manager_name, manager.manager_id
-- FROM employees, manager
-- JOIN all_roles ON employees.role_id = all_roles.id;
-- JOIN employees ON manager.manager_id = employees.id

-- SELECT 
-- departments.name
-- FROM departments
-- JOIN all_roles ON department.id = all_roles.department_id;


-- SELECT departments.name
-- FROM departments
-- -- FULL OUTER JOIN all_roles ON departments.id = all_roles.departments_id

-- SELECT 
-- all_roles.job_title, all_roles.salary, all_roles.department_id, departments.id, departments.name
-- FROM all_roles
-- JOIN departments ON all_roles.department_id = departments.id;