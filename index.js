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
            message: 'What would you like to add?',
            choices: ['department', 'role', 'employee', 'EXIT'],
        })
        .then((responce) => {
            switch (responce.add) {
                case 'department':
                    dep()
                    break;
                case 'role':
                    role()
                    break;
                case 'employee':
                    empl()
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
                {name: responce.name},
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
        .prompt([{
            name: 'department',
            type: 'input',
            message: 'In which department are you adding a role?'
        },
        {
            name: 'name',
            type: 'input',
            message: 'What role would you like to add?'
        }])
}

function empl() {
    inquirer
        .prompt([{
            name: 'role',
            type: 'input',
            message: "What is this employee's role?"
        },
        {
            name: 'first',
            type: 'input',
            message: "What is this employee's first name?"
        },
        {
            name: 'last',
            type: 'input',
            message: "What is this employee's last name?"
        },
    ])
}
init();