// challenge 3

const dogs = require("../dogs.js");

// serve form for adding dog
function get(request, response){
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
}

// process user's request to add dog and redirect to homepage
function post(request, response) {
    console.log(request.body);
    const key = request.body.name.toLowerCase();
    dogs[key] = request.body;
    console.log(dogs);
    response.redirect('/');
}

module.exports = { get, post }