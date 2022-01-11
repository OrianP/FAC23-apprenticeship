const { response, request } = require("express");
const express = require("express");
const dogs = require("./dogs.js");

const server = express();

const PORT = 3333;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

// challenge 1 and 2

server.get('/', (request, response) => {
    const userSearch = request.query;
    let userString = userSearch.dogSearch;

    let dogNames = '';
    console.log(userString)

    if (userString) {
        for (const dog of Object.keys(dogs)) {
            if (dog.includes(userString.toLowerCase())) {
                dogNames += `<li>${dog}</li>`
            }
        }
    }

    else {
        // userString = '';
        for (const dog of Object.values(dogs)) {
            dogNames += `<li>${dog.name}</li>`
    }
    }

    const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Dogs!</title>
      </head>
      <body>
        <form>
        <input name="dogSearch"></input>
        </form>
        <ul>${dogNames}</ul>
      </body>
    </html>
    `;
    response.send(html);
})

// challenge 3

server.get('/add-dog', (request, response) => {
    const html = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Dogs!</title>
      </head>
      <body>
        <form method="POST">
        <label>Name</label>
        <input name="name"></input>
        <label>Breed</label>
        <input name="breed"></input>
        <input type="submit" value="submit"></input>
        </form>
      </body>
    </html>
    `;
    response.send(html);
})

const bodyParser = express.urlencoded({ extended: false });

server.post('/add-dog', bodyParser, (request, response) => {
    console.log(request.body);
    response.send('Thanks');
})
