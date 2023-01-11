const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');
// const { response } = require('express');

// const Sequelize = require('./config/connection');

// require('dotenv').config()
// const db = new Sequelize (
//   process.env.DB_NAME,
//   process.env.DB_PASSWORD,
//   process.env.DB_USER
// )
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
)

// TODO: Create a function to initialize app
function taskManager() {
inquirer
    .prompt([
    {
      type: 'list',
      name: 'task',
      message: 'Choose one:',
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
    },
   ])
    .then((response) => {
      if(response.task === "View all departments") {
        viewAllDepartments();
      }
      if(response.task === "View all roles") {
        viewAllRoles();
      }
      if(response.task === "View all employees") {
        viewAllEmployees();
      }
      if(response.task === "Add a department") {
        addDepartment();
      } 
      if(response.task === "Add a role") {
        addRole();
      } 
      if(response.task === "Add an employee") {
        addEmployee();
      } 
      if(response.task === "Update an employee role") {
        updateEmployeeRole();
      }
    })
    .catch((error)=> {
        console.log(error)
    })
};

function viewAllDepartments() {
    db.query("SELECT * FROM departments" , function (err, result) {
      console.table(result)
    })
    taskManager();
}

function viewAllRoles() {
  db.query("SELECT * FROM all_roles" , function (err, result) {
    console.table(result)
  })
  taskManager();
}

function viewAllEmployees() {
  db.query("SELECT * FROM employees" , function (err, result) {
    console.table(result)
  })
  taskManager();
}

function addDepartment() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'department',
      message: 'Add a department?',
    },
  ])
  .then((response) => {
    db.query("INSERT INTO departments(name) VALUES(?)", response.department, function (err, result) {
      console.table(result)
    })
    taskManager();
  })
}


function addRole() {
  const depts = []

  db.query("SELECT * FROM departments", function (err, deptResults) {
    for(let i = 0; i < deptResults.length; i++) {
    depts.push({
      id: deptResults[i].id,
      name: deptResults[i].name
    })}
    console.log(depts)
})
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'job',
      message: 'Add a jobtitle?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Salary?',
    },
    {
      type: 'list',
      name: 'department',
      message: 'Choose a department?',
      choices: depts,
    },
  ])
  .then((response) => {
   let deptId 
   for(let i = 0; i < depts.length; i++) {
    if(response.department == depts[i].name){
      deptId = depts[i].id
    }}
    console.log(deptId)
    console.log(response)
   db.query("INSERT INTO all_roles(job_title, salary, department_id) VALUES(?, ?, ?)", response.job, response.salary, deptId, function (err, result) {
    console.table(result)
    })
  }
  )
}

function addEmployee(){
  const roles = []

  db.query("SELECT * FROM all_roles", function (err, roleResults) {
    for(let i = 0; i < roleResults.length; i++) {
    roles.push({
      id: roleResults[i].id,
      name: roleResults[i].job_title,
      salary: roleResults[i].salary,
      department: roleResults[i].department_id
    })}
    console.log(roles)
})
inquirer
  .prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is your first name?',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is your last name?',
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'What is your role',
      choices: roles,
    },
  ])
  .then((response) => {
    db.query("INSERT INTO employees(first_name, last_name, role_id) VALUES(?, ?, ?)", response.firstName, response.lastName, response.roleId, function (err, result) {
      console.table(result)
    })
    addRole();
  })
}

function updateEmployeeRole(){
  const employeeList = []

  db.query("SELECT * FROM employee", function (err, employeeResults) {
    for(let i = 0; i < employeeResults.length; i++) {
    employeeList.push({
      id: employeeResults[i].id,
      firstname: employeeResults[i].first_name,
      lastname: employeeResults[i].last_name
      // role_id: employeeResults[i].role_id,
      // manager_id: employeeResults[i].manager_id
    })}
    console.log(employeeList)
})
inquirer
  .prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Whose information would you like to update?',
      choices: employeeList,
    },
    {
      type: 'list',
      name: 'update',
      message: 'What will you be updating?',
      choices: ["department, role, salary, manager id"]
    },
  ])
  .then((response) => {
    if(response.update === "department") {
    db.query("INSERT INTO employees(first_name, last_name, role_id) VALUES(?, ?, ?)", response.firstName, response.lastName, response.roleId, function (err, result) {
      console.table(result)
    })}
    taskManager();
  })
}

taskManager();