const express = require('express')
const app = express()
const { PORT } = require("./config/config")

const morgan = require('morgan')
const cors = require('cors')

const auth = require('./routes/auth')
const router = require('./routes/routes')
const user = require('./routes/user')
const {NotFoundError} = require("./utils/errors")

// Parsing requests into JSON
app.use(express.json())

app.use(cors())
app.use(morgan('tiny'))

// Routes used for authentication (signing in & registering)
app.use("/auth", auth)

// Routes used for Exploreio
app.use("/exploreio", router)

app.use("/user", user)

// Not Found Error
app.use((req, res, next) => {
    return next(new NotFoundError())
})

// Generic Error Handler
app.use((error, req, res, next) => {
    const message = error.message ? error.message: "Server problem"
    const status = error.status ? error.status: 500

    res.status(status).json({message, status})
})

app.listen(PORT, async () => {
    console.log(`App is currently listening on port ${PORT}!`)
})

module.exports = app