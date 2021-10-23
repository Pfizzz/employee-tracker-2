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
          "View all employees",
          "View all employee positions",
          "View all departments",
          "Add department",
          "Add employee",
          "Add employee role",
          "Update an employee role",
          "Quit application",
        ],
      },
    ])
    .then((choiceAnswers) => {
      console.log(choiceAnswers);
      if (choiceAnswers.choices === "View all employees") {
        viewEmployees();
      }
      if (choiceAnswers.choices === "View all employee positions") {
        viewEmpRole();
      }

      if (choiceAnswers.choices === "View all departments") {
        viewDepartment();
      }
      if (choiceAnswers.choices === "Add department") {
        addDepartment();
      }
      if (choiceAnswers.choices === "Add employee") {
        addEmployee();
      }
      if (choiceAnswers.choices === "Add employee role") {
        addRole();
        if (choiceAnswers.choices === "Update an employee role") {
          updateEmployee();
        }
      }
      if (choiceAnswers.choices === "Quit application") {
        process.exit(1);
      }
    });
}

// function to view all employees
function viewEmployees() {
  let employeeQuery = `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    empRole.title,
    employee.manager_id,
    department.id AS 'department',
    empRole.salary 
    FROM employee, empRole, department
    WHERE department.id = empRole.department_id
    AND empRole.id = employee.role_id
    ORDER BY employee.id ASC`;

  db.promise()
    .query(employeeQuery)
    .then(([rows, fields]) => {
      console.table(rows);
      startApp();
      
    })
    .catch(console.log)

// function to view all employee roles
}
function viewEmpRole() {
  db.query("SELECT * FROM empRole;", (err, result) => {
    if (err) {
      console.log("Something went wrong.");
    }
    console.table(result);
    startApp();
  });
};

// view departments
function viewDepartment() {
  db.query("SELECT * FROM department;", (err, result) => {
    if (err) {
      console.log("No departments found!");
    }
    console.table(result);
    startApp();
  });
};

// starts app on "node app"
startApp();