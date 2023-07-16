const sqlite = require('sqlite3');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const passHash = "$2b$10$cI8NmAN0RpgA/RSwu55QX.n4XFOBquCGiEh1fFFu8HnXZVkODynjq";
const secret_key = "12EUFJNR0s2RfuNxz3TbnTP5yqbJusHCkJ5WoQt1Ms849NvJ5nGWDEBg4zjF";
let db = new sqlite.Database('./database.sqlite');
db.run("CREATE TABLE IF NOT EXISTS flights (id INTEGER PRIMARYKEY AUTO INCREMENT);");

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
         const token = jwt.sign({ username }, secret_key, { expiresIn: '1h' });

         // Send the token in the response
         res.json({ token });
      } else {
         res.status(401).send('Invalid username or password');
      }
   });
});

app.post('/validateToken', (req, res) => {
   const token = req.headers.authorization?.split(' ')[1];
 
   // Check if the token exists
   if (!token) {
     return res.status(401).json({ valid: false });
   }
 
   try {
     // Verify the token
     jwt.verify(token, secret_key, (err, decoded) => {
       if (err) {
         // Token verification failed
         return res.status(401).json({ valid: false });
       } else {
         // Token is valid
         return res.json({ valid: true });
       }
     });
   } catch (error) {
     // Error occurred during token verification
     return res.status(500).json({ error: 'Internal server error' });
   }
 });
 
 
var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log("Website is here :) --> http://%s:%s", host, port);
});
