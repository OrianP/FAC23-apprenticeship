// load the express package
const express = require('express');
// initialize a server
const server = express();

// access and serve static files like css, html, images etc from the public directory
const staticHandler = express.static("public");

server.use(staticHandler);

// run the logger function on all incoming requests
server.use(logger);

// create a response to a GET request for the file path '/'
server.get("/", (request, response, ) => {
    const time = new Date().toLocaleTimeString();
    response.set({
        "x-fake-header": "my value",
        "x-another-header": "another value",
      });
    response.status(404).send(`<h1>hello, it's ${time}</h1>`);
})

function logger(request, response, next) {
    console.log(request.method + " " + request.url);
    next();
  }
  
server.get("/", (request, response) => {
    response.send("<h1>Hello</h1>");
  });

server.get("/json", (request, response) => {
    response.send({ message: "Hello" });
});

server.get("/redirects", (request, response) => {
    response.redirect("/");
});

server.get("/users/:name", (request, response) => {
    const name = request.params.name;
    response.send(`<h1>Hello ${name}</h1>`);
  });

const bodyParser = express.urlencoded();

server.post("/submit", bodyParser, (request, response) => {
console.log(request.body);
response.send("thanks for submitting");
});

server.use((request, response) => {
    response.status(404).send("<h1>Not found</h1>");
});

const PORT = 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))