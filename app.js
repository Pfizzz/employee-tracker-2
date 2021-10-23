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
          "View All Employees By Department",
          "View All Employees by Manager",
          "View all Departments",
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
      if (choiceAnswers.choices === "View All Employees By Department") {
        viewRole();
      }
      if (choiceAnswers.choices === "View All Employees by Manager") {
        viewManager();
      }
      // get rid of this later
      if (choiceAnswers.choices === "View all Departments") {
        viewDepartment();
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
  let employeeQuery = `SELECT employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    employee.manager_id,
    department.id AS 'department',
    role.salary 
    FROM employee, role, department
    WHERE department.id = role.department_id
    AND role.id = employee.role_id
    ORDER BY employee.id ASC
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
  db.query("SELECT * FROM role;", (err, result) => {
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