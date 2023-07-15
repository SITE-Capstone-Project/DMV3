const {getDatabaseURI} = require("../config/config")
const {Client} = require("pg")

const db = new Client({connectionString: getDatabaseURI()})

db.connect((error) => {
    if (error) {
        console.log("Error connecting to postgres")
    } else {
        console.log("Database is successfully connected to postgres")
    }
})

module.exports = db;

