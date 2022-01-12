const { response, request } = require("express");
const express = require("express");
const server = express();
const bodyParser = express.urlencoded();

// dog object
const dogs = require("./dogs.js");

// handlers for adding dog
const addDog = require('./routes/addDog.js');

const PORT = 3333;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

// challenge 1 and 2

server.get('/', (request, response) => {
  const userSearch = request.query;
  let userString = userSearch.dogSearch;

  let dogNames = '';
  console.log(userString)

  if (userString) {
    for (const dog of Object.values(dogs)) {
      if (dog.name.toLowerCase().includes(userString.toLowerCase())) {  
            dogNames += `<li>${dog.name}</li>`
      }
    }
  } else {
    for (const dog of Object.values(dogs)) {
      dogNames += 
        `<li>${dog.name}
        <form action="/delete-dog" method="POST">
          <button name="dogName" value="${dog.name}">Delete</button>
        </form>
        </li>`
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

server.get('/add-dog', addDog.get);

server.post('/add-dog', bodyParser, addDog.post);

// challenge 4
server.post('/delete-dog', bodyParser, (request, response) => {
  const dogToDelete = request.body.dogName.toLowerCase();
  delete dogs[dogToDelete];
  response.redirect('/');
})
