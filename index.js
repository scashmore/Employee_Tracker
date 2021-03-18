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
            message: 'Add or view?',
            choices: ['add department', 'add role', 'add employee', 'view departments', 'view roles', 'view employees', 'EXIT'],
        })
        .then((responce) => {
            switch (responce.add) {
                case 'add department':
                    dep()
                    break;
                case 'add role':
                    role()
                    break;
                case 'add employees':
                    empl()
                    break;
                case 'view departments':
                    connection.query(`SELECT * FROM department`, (error, row) => {
                        if (error) throw error;
                    console.log(row)});
                    init()
                    break;
                case 'view roles':
                    connection.query(`SELECT * FROM role`, (error, row) => {
                        if (error) throw error;
                    console.log(row)});
                    init()
                    break;
                case 'view employee':
                    connection.query(`SELECT * FROM employee`,(error, row) => {
                        if (error) throw error;
                    console.log(row)});
                    init()
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
    connection.query(`SELECT * FROM department`, (res, error) => {
        if (error) throw error;
        inquirer
            .prompt([{
                name: 'department',
                type: 'rawlist',
                message: 'In which department are you adding a role?',
                choices() {
                    const arr = [];
                    res.forEach(({ name }) => {
                        arr.push(name);
                    })
                    return arr;
                }
            },
            {
                name: 'name',
                type: 'input',
                message: 'What role would you like to add?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'what is the salary of this role?'
            }])
            .then(responce => {
                const department = responce.department;
                connection.query('SELECT * FROM department', (pull, error) => {
                    if (error) throw error;
                    let filtered = pull.filter((pull) => {
                        return pull.name == department;
                    })
                    let id = filtered[0].id;
                    connection.query(
                        `INSERT INTO role SET ?`,
                        {
                            title: responce.name,
                            salary: responce.salary,
                            department_id: id
                        },
                        (error) => {
                            if (error) throw error;
                            console.log('Role sucessfully created!');
                            connection.end();
                            init();
                        }
                    )
                })
            })
    })
}

function empl() {
    connection.query(`SELECT * FROM role`, (res, error) => {
        if (error) throw error;
        inquirer
            .prompt([{
                name: 'role',
                type: 'rawlist',
                message: "What is this employee's role?",
                choices() {
                    const arr = [];
                    res.forEach(({ title }) => {
                        arr.push(title);
                    })
                    return arr;
                }
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
            .then(responce => {
                const role = responce.role;
                connection.query('SELECT * FROM role', (pull, error) => {
                    if (error) throw error;
                    let filtered = pull.filter((pull) => {
                        return pull.title == role;
                    })
                    let id = filtered[0].id;
                    connection.query(
                        `INSERT INTO employee SET ?`,
                        {
                            first_name: responce.first,
                            last_name: responce.last,
                            role_id: id
                        },
                        (error) => {
                            if (error) throw error;
                            console.log('Employee sucessfully created!');
                            connection.end();
                            init();
                        }
                    )
                })
            })
    })
}
init();