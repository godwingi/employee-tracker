const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'PLEASE ENTER YOUR PASSWORD',
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
      choices: ["View all departments", "View all roles", "View all Managers", "View all employees", "Add a department", "Add a role", "Add an employee", "Add a manager", "Update an employee role", "Quit"]
    },
   ])
    .then((response) => {
      if(response.task === "View all departments") {
        viewAllDepartments();
      }
      if(response.task === "View all roles") {
        viewAllRoles();
      }
      if(response.task === "View all Managers") {
        viewAllManagers();
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
      if(response.task === "Add a manager") {
        addManager();
      } 
      if(response.task === "Update an employee role") {
        updateEmployeeRole();
      }
      if(response.task === "Quit") {
        quit();
      }
    })
    .catch((error)=> {
        console.log(error)
    })
};

function quit() {
  console.log("You have successfully quit the application!")
}
function viewAllDepartments() {
    db.query("SELECT * FROM departments" , function (err, result) {
      console.table("/n" , result)
    })
    taskManager();
  }

  function viewAllManagers() {
    db.query("SELECT * FROM manager" , function (err, result) {
      console.table("/n" , result)
    })
    taskManager();
  }

function viewAllRoles() {
  db.query("SELECT * FROM all_roles" , function (err, result) {
    console.table("/n" , result)
  })
  taskManager();
}

function viewAllEmployees() {
  db.query("SELECT employees.id, employees.first_name, employees.last_name, employees.manager, employees.role_id, all_roles.job_title, all_roles.salary, all_roles.department_id FROM employees JOIN all_roles ON employees.role_id = all_roles.id" , function (err, result) {
    console.table("/n" , result)
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
      console.table("/n" , result)
    })
    taskManager();
  })
}

function addManager() {
  db.query('SELECT * FROM employees;', (err, result) => {
    let managerOptions = result.map((newManager) => {
      return {
        id: newManager.id,
        name: `${newManager.first_name} ${newManager.last_name}`
      }})
      // console.log(managerOptions)

  inquirer
  .prompt([
    {
      type: 'list',
      name: 'promotion',
      message: 'Choose an employee to promote.',
      choices: managerOptions,
    },
  ])
  .then((response) => {
    
    let managerName = managerOptions.filter((promotion) => promotion.name === response.promotion)
  

    db.query(`INSERT INTO manager(manager_name, manager_id) VALUES('${managerName[0].name}', ${managerName[0].id});`, function (err, result) {
      if(err) console.log(err)
      console.table("/n" , result)
    })
    taskManager();
  })
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
    // console.log(depts)
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
    db.query(`INSERT INTO all_roles(job_title, salary, department_id) VALUES('${response.job}', ${response.salary}, ${deptId})`, function (err, result) {
      console.table("/n" , result)
    })
    taskManager();
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
    })}
})

const manager = []
db.query("SELECT * FROM manager", function (err, managerResults) {
  for(let i = 0; i < managerResults.length; i++) {
  manager.push(managerResults[i].manager_name)
  // console.log(manager)
}})

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
      name: 'managerName',
      message: 'Who is your manager?',
      choices: manager,
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'What is your role',
      choices: roles,
    },
  ])
  .then((response) => {
    let roleId 
    for(let i = 0; i < roles.length; i++) {
     if(response.roleId == roles[i].name){
       roleId = roles[i].id
      }}
      // console.log(response.firstName)
      // console.log(response.lastName)
      // console.log(response.managerName)
      // console.log(response.roleId)
      // console.log(roleId)
    db.query(`INSERT INTO employees(first_name, last_name, manager, role_id) VALUES('${response.firstName}', '${response.lastName}', '${response.managerName}', ${roleId})`, function (err, result) {
      console.table("/n" , result)
      console.log(result)
    }) 
    taskManager();
  }
  )
}

function updateEmployeeRole(){
  const employeeList = []

  db.query("SELECT employees.id, employees.first_name, employees.last_name FROM employees;", function (err, employeeResults) {
    console.log(employeeResults)
    for(let i = 0; i < employeeResults.length; i++) {
   
    employeeList.push({
      id: employeeResults[i].id,
      name: `${employeeResults[i].first_name} ${employeeResults[i].last_name}`
    })}
    console.log(employeeList)

    inquirer
    .prompt([
    {
      type: 'list',
      name: 'employee',
      message: 'Whose information would you like to update?',
      choices: employeeList,
    },
    ])
    .then((response) => {
    console.log(response)
    let selectedUser = employeeList.filter((employee) => employee.name === response.employee)
    // console.log(selectedUser)

    db.query('SELECT * FROM all_roles', (err, result) => {
      let roleDetails = result.map((role) => {
        return {
          id: role.id,
          name: role.job_title
        }
      })
      // console.log(roleDetails)

      inquirer
      .prompt([
    {
      type: 'list',
      name: 'role',
      message: 'What role would you like to update?',
      choices: roleDetails,
    },
  ])
  .then((response) => {
    let selectedRole = roleDetails.filter((role) => role.name === response.role)
    console.log(selectedRole)
    console.log(selectedUser)

    db.query(`UPDATE employees SET role_id = ${selectedRole[0].id} WHERE id = ${selectedUser[0].id};`, function (err, result) {
      console.table("/n" , result)
    })
    taskManager();
  })
    })
  })
})
}

taskManager();