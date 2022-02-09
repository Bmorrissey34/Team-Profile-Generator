const fs = require('fs');
const inquirer = require('inquirer');
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const team = [];

const anotherEmployeeQuestions = [{
    type: 'list',
    message: `Would you like to add employee's?`,
    name: 'team',
    choices: ['Engineer', 'Intern', 'Done']
}]

const managerQuestions = [{
        type: 'input',
        message: 'What is your name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is your ID#?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is your office number?',
        name: 'officeNumber',
    }
]

const engineerQuestions = [{
        type: 'input',
        message: 'What is your name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is your ID#?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'github',
    }
]

const internQuestions = [{
        type: 'input',
        message: 'What is your name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is your ID#?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is your email?',
        name: 'email',
    },
    {
        type: 'input',
        message: `What is the school you're attending?`,
        name: 'school',
    }
]

const addManager = () => {
    inquirer.prompt(managerQuestions)
        .then((response) => {
            const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
            team.push(manager);
            addAnotherEmployee();
        })
}

addManager();


const addAnotherEmployee = () => {
    inquirer.prompt(anotherEmployeeQuestions)
        .then((response) => {
            if (response.team === 'Engineer') {
                addEngineer();
            } else if (response.team === 'Intern') {
                addIntern();
            } else {
                makeHtml();
            }
        })
}


const addEngineer = () => {
    inquirer.prompt(engineerQuestions)
        .then((response) => {
            const engineer = new Engineer(response.name, response.id, response.email, response.github);
            team.push(engineer);
            addAnotherEmployee();
        })
}


const addIntern = () => {
    inquirer.prompt(internQuestions)
        .then((response) => {
            const intern = new Intern(response.name, response.id, response.email, response.school)
            team.push(intern);
            addAnotherEmployee();
        })
}


const makeHtml = () => {
    let body = '';

    for (let i = 0; i < team.length; i++) {
        if (team[i].getRole() === 'Manager') {
            body += makeManagerCard(team[i]);
        } else if (team[i].getRole() === 'Engineer') {
            body += makeEngineerCard(team[i]);
        } else if (team[i].getRole() === 'Intern') {
            body += makeInternCard(team[i]);
        }
    };


    let htmlPage = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
        <link rel="stylesheet" href="./style.css">
        <title>Team Profile Generator</title>
    </head>
    <body>
        <header>
            <h1>My Team</h1>
        </header>
        <div class="cards">
            ${body}
        </div>
    </body>
    </html>`;

    fs.writeFile('./dist/index.html', htmlPage, function (err) {
        if (err) {
            console.log('There was an error!');
        }
    });
}


const makeManagerCard = (manager) => {
    return `<div class="card text-white bg-dark mb-3" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${manager.getRole()}</h5>
      <div class="card-text">Name: ${manager.name}</div>
      <div class="card-text">ID: ${manager.id}</div>
      <a class="emailLink" href="mailto:${manager.email}">Email: ${manager.email}</a>
      <div class="card-text">Office Number: ${manager.officeNumber}</div>
    </div>
  </div>`
}

const makeEngineerCard = (engineer) => {
    return `<div class="card text-white bg-dark mb-3" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${engineer.getRole()}</h5>
      <div class="card-text">Name: ${engineer.name}</div>
      <div class="card-text">ID: ${engineer.id}</div>
      <div class="card-text"><a class="emailLink" href="mailto:${engineer.email}">Email: ${engineer.email}</a></div>
      <a href="https://www.github.com/${engineer.github}" target=''>GitHub: ${engineer.github}</a>
    </div>
  </div>`
}

const makeInternCard = (intern) => {
    return `<div class="card text-white bg-dark mb-3" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${intern.getRole()}</h5>
      <div class="card-text">Name: ${intern.name}</div>
      <div class="card-text">ID: ${intern.id}</div> 
      <a class="emailLink" href="mailto:${intern.email}">Email: ${intern.email}</a>
      <div class="card-text">School: ${intern.school}</div>
      </div>
  </div>`
}