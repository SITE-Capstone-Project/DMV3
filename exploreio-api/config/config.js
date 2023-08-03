require('dotenv').config()

// Some const variables, taken from .env
const PORT = process.env.PORT || 3001
const SECRET_KEY = process.env.SECRET_KEY || "SECRET_KEY_GOES_HERE"
const BCRYPT_WORK_FACTOR = process.env.WORK_FACTOR || 10
const GPT_API_KEY = process.env.GPT_API_KEY
const TRAV_ADVISOR_KEY = process.env.TRAV_ADVISOR_KEY
const DUFFEL_API_KEY = process.env.DUFFEL_API_KEY

// Grabbing data to use as the connection-string for the client.
function getDatabaseURI() {
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "postgres"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "postgres"

    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

module.exports = {
    getDatabaseURI,
    PORT,
    SECRET_KEY,
    BCRYPT_WORK_FACTOR,
    GPT_API_KEY,
    TRAV_ADVISOR_KEY,
    DUFFEL_API_KEY
}