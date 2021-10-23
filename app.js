// get the client
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Erebor@12',
  database: 'employee_db'
});

console.log(connection);
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => console.log(answers));