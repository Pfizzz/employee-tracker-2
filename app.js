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
      if (choiceAnswers.choices === "View all Employees") {
        viewEmployees();
      }
      if (choiceAnswers.choices === "View all roles") {
        viewRoles();
      }

      if (choiceAnswers.choices === "View Department") {
        viewDepartment();
      }
      if (choiceAnswers.choices === "Add a Department") {
        addDepartment();
      }
      if (choiceAnswers.choices === "Add an Employee") {
        addEmployee();
      }
      if (choiceAnswers.choices === "Update an Employee Role") {
        updateEmployee();
      }
      if (choiceAnswers.choices === "Add role") {
        addRole();
      }
      if(choiceAnswers.choices === "Exit"){
        process.exit(1);
      }
    });
}

startApp();