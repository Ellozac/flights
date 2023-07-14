const sqlite = require('sqlite3');
const express = require('express');
const app = express();

let db = new sqlite.Database('./database.sqlite');
db.run("CREATE TABLE IF NOT EXISTS flights (id INTEGER PRIMARYKEY AUTO INCREMENT);")


app.use(express.static('./public'));



var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;

   console.log("Website is here :) -->http://%s:%s", host, port);
});