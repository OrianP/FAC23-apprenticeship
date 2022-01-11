const express = require("express");
const home = require("./routes/home.js");
const addDog = require("./routes/addDog.js");
const deleteDog = require("./routes/deleteDog.js");

const server = express();

const bodyParser = express.urlencoded({ extended: false });

server.get("/", home.get);

server.get("/add-dog", addDog.get);
server.post("/add-dog", bodyParser, addDog.post);

server.post("/delete-dog", bodyParser, deleteDog.post);

const PORT = 3333;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
