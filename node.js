const sqlite = require('sqlite3');
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const passHash = "$2b$10$cI8NmAN0RpgA/RSwu55QX.n4XFOBquCGiEh1fFFu8HnXZVkODynjq"
let db = new sqlite.Database('./database.sqlite');
db.run("CREATE TABLE IF NOT EXISTS flights (id INTEGER PRIMARYKEY AUTO INCREMENT);")


app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// POST route for "/devLog"
app.post('/devLog', (req, res) => {
   // Retrieve the username and password from the request body
   const { username, password } = req.body;
   
   // Perform authentication or any other necessary logic
   // Here, for demonstration purposes, we're simply checking if the username and password match a predefined value
   bcrypt.compare(password, passHash, (err, outcome) => {
      if (outcome && username == "QJZ") {
         res.send("LOG");

      } else {
         res.status(401).send('Invalid username or password');
       }
   });

 });




var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log("Website is here :) -->http://%s:%s", host, port);
});



