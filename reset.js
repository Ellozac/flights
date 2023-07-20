const sq = require('sqlite3').verbose();
let db = new sq.Database("database.sqlite")

db.run("DROP TABLE flights");