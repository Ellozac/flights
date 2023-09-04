const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite = require('sqlite3').verbose();
const app = express();
require("dotenv").config();
const passHash = process.env.PASSHASH;
const secret_key = process.env.SECRET_KEY;
var port = 8081
let db = new sqlite.Database('database.sqlite');
db.run("CREATE TABLE IF NOT EXISTS flights (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, pilot TEXT NOT NULL, aircraft TEXT NOT NULL, origin TEXT NOT NULL, destination TEXT NOT NULL, duration INTEGER NOT NULL, simbrief TEXT NOT NULL);");

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// POST route for "/devLog"
app.post('/devLog', (req, res) => {
   // Retrieve the username and password from the request body
   const { username, password } = req.body;

   // Perform authentication or any other necessa ry logic
   // Here, for demonstration purposes, we're simply checking if the username and password match a predefined value
   bcrypt.compare(password, passHash, (err, outcome) => {
      if (outcome && username == "QJZ") {
         const token = jwt.sign({ username }, secret_key, { expiresIn: '1h' });

         // Send the token in the response
         res.json({ token });
      } else {
         res.status(401).json({ error: 'Invalid username or password' });
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
app.post("/databaseQuery", (req,res) => {
  db.each("SELECT * FROM flights", (err, call) => {
    console.log(call);
    return res.json({ call });  
  });  
});

app.post('/addFlight', (req, res) => {
  const FLIGHT_INFORMATION = req.body;
  for (const i in FLIGHT_INFORMATION) {
    if (FLIGHT_INFORMATION[i] === '') {
      return res.status(400).json({ error: `Field cannot be empty` });
    }
  }

  db.run(
    "INSERT INTO flights ( pilot, aircraft, origin, destination, duration, simbrief) VALUES (?,?,?,?,?,?);",[FLIGHT_INFORMATION.pilotName,FLIGHT_INFORMATION.aircraft,FLIGHT_INFORMATION.origin,FLIGHT_INFORMATION.destination,FLIGHT_INFORMATION.duration,FLIGHT_INFORMATION.simbrief],
    function (err) {
      if (err) {
        console.error("Error inserting data:", err);
        res.sendStatus(500); // Send an error status if the insertion fails
      } else {
        console.log("Flight information inserted successfully:", FLIGHT_INFORMATION);
        res.sendStatus(200); // Send a success status if the insertion is successful
      }
    }
  );
});


// allows on run of server to specify a spicfic port.
process.argv.forEach(function (val, index, array) {
  if (val === "--port") {
    try {
      const re = /^\d*$/;
      if (re.test(array.at((index + 1)))) {
        port = Number(array.at((index + 1)));
        console.log("setting the port to ", port);
      } else {throw new TypeError("not a number")};
    } catch (e) {
      console.error(e, "ERROR OCCURED the --port was not set correctly --port <port>");
    };
  };
});





var server = app.listen(port, function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log("Website is here :) --> http://%s:%s", host, port);
});
