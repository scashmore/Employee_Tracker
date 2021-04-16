const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_trackerDB',
});

function init() {
    inquirer
        .prompt({
            name: 'add',
            type: 'list',
            message: 'Menu',
            choices: ['add department', 'add role', 'add employee', 'update employee role',
                'view departments', 'view roles', 'view employees', 'EXIT'],
        })
        .then((responce) => {
            switch (responce.add) {
                case 'add department':
                    dep()
                    break;
                case 'add role':
                    role()
                    break;
                case 'add employee':
                    empl()
                    break;
                case 'view departments':
                    connection.query(`SELECT * FROM department`, (error, row) => {
                        if (error) throw error;
                        console.log(row)
                    });
                    init()
                    break;
                case 'view roles':
                    connection.query(`SELECT * FROM role`, (error, row) => {
                        if (error) throw error;
                        console.log(row)
                    });
                    init()
                    break;
                case 'view employees':
                    connection.query(`SELECT * FROM employee_trackerDB.employee`, (error, row) => {
                        if (error) throw error;
                        console.log(row)
                    });
                    init()
                    break;
                case 'update employee role':
                    update()
                    break;
                case 'EXIT':
                    connection.end()
                    break;
            }
        }
        );
};

function dep() {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'What department would you like to add?'
        })
        .then(responce => {
            connection.query(
                `INSERT INTO department SET ?`,
                { name: responce.name },
                (error) => {
                    if (error) throw error;
                    console.log('department sucessfully created!');
                    connection.end();
                    init();
                }
            )
        })
}

function role() {
    inquirer
    .prompt([
        {
            message: "enter title:",
            type: "input",
            name: "title"
        }, {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "enter department in which you'd like to add role by id:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", 
        [response.title, response.salary, response.department_id], function (err) {
            if (err) throw err
        })
        init();
    })
}

function empl() {
    inquirer
        .prompt([
        {
            name: 'first_name',
            type: 'input',
            message: "What is this employee's first name?"
        },
        {
            name: 'last_name',
            type: 'input',
            message: "What is this employee's last name?"
        },
        {
            type: "number",
            name: "role_id",
            message: "What is the employees role id?"
        },
        ])
        .then(function (response) {
            connection.query("INSERT INTO employee SET ?", 
            response,
             function(err, response) {
               if (err) throw err;
       
               init (); 
            })
        })
}

function update() {
    inquirer
        .prompt([
            {
                message: "which employee would you like to update? (Search by first name)",
                type: "input",
                name: "name"
            }, {
                message: "enter the new role ID:",
                type: "number",
                name: "role_id"
            }
        ]).then(function (response) {
            connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            })
            init();
        })
}

init();