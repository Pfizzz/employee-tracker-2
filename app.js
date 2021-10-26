// get the client
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Erebor@12',
  database: 'employee_db'
},
  console.log("Connected to the employee database.")
);

db.query(`SELECT * FROM employee`, (err, rows) => {
  // console.table(rows);
})

function startApp() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Select an option from the following:",
        choices: [
          "View All Employees",
          "View All Departments",
          "Add Department",
          "Add Employee",
          "Update Employee Role",
          "View all Roles",
          "Quit application",
        ],
      },
    ])
    .then((choiceAnswers) => {
      console.log(choiceAnswers);
      if (choiceAnswers.choices === "View All Employees") {
        viewEmployees();
      }
      if (choiceAnswers.choices === "View All Departments") {
        viewDepartment();
      }
      if (choiceAnswers.choices === "Add Department") {
        addDepartment();
      }
      if (choiceAnswers.choices === "Add Employee") {
        addEmployee();
      }
      if (choiceAnswers.choices === "Update Employee Role") {
        updateEmployee();
      }
      if (choiceAnswers.choices === "View all Roles") {
        viewRole();
      }
      if (choiceAnswers.choices === "Quit application") {
        process.exit(1);
      }
    });
}

// function to view all employees
function viewEmployees() {
  // JOIN managers to this
  let employeeQuery = `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    manager.last_name AS manager,
    department.name,
    role.salary 
    FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id = role.department_id
    LEFT JOIN employee manager ON employee.manager_id = manager.id
    `;

  db.promise()
    .query(employeeQuery)
    .then(([rows, fields]) => {
      console.table(rows);
      startApp();

    })
    .catch(console.log)

  // function to view all employee roles
}
function viewRole() {
  // JOIN DEPARTMENT TO THIS
  db.query(
    "SELECT * FROM role;", (err, result) => {
    if (err) {
      console.log("Something went wrong.");
    }
    console.table(result);
    startApp();
  });
};

// view employees by departments DONE
function viewDepartment() {
  db.query(
    "SELECT * FROM department;", (err, result) => {
      if (err) {
        console.log("No departments found!");
      }
      console.table(result);
      startApp();
    });
};

// add a department
async function addDepartment() {
  const newDepartment = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please enter the name of the new department."
    }
  ])
  await db.promise().query("INSERT INTO department SET ?", newDepartment)
  console.log("Added department");
  startApp();
}


// update employee
async function updateEmployee() {
  const allRoles = await db.promise().query("SELECT * FROM role")
  const allEmployees = await db.promise().query("SELECT * FROM employee")
  const updatedRole = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Please select the employee.",
      choices: allEmployees[0].map( (employee) => ({ name: employee.last_name, value:employee.id}))
  },
    {
      type: "list",
      name: "role_id",
      message: "Please select the employee's role.",
      choices: allRoles[0].map( (role) => ({ name: role.title, value:role.id}))
    }

  ])
  await db.promise().query("UPDATE employee SET role_id = ? WHERE id = ?", [updatedRole.role_id, updatedRole.id])
  console.log("Updated employee");
  startApp();
}

// add an eployee
async function addEmployee() {
  const allRoles = await db.promise().query("SELECT * FROM role")
  const allEmployees = await db.promise().query("SELECT * FROM employee")
  const newEmployee = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Please enter a first name."
    },
    {
    type: "input",
    name: "last_name",
    message: "Please enter a last name."
  },
  {
    type: "list",
    name: "role_id",
    message: "Please select the employee's role.",
    choices: allRoles[0].map( (role) => ({ name: role.title, value:role.id}))
  },
  {
      type: "list",
      name: "manager_id",
      message: "Please select the employee's manager.",
      choices: allEmployees[0].map( (employee) => ({ name: employee.last_name, value:employee.id}))
  }
  ]

  )
  const employeeData = await db.promise().query("INSERT INTO employee SET ?", newEmployee)
  console.log("Added employee");
  startApp();
}


// starts app on "node app"
startApp();