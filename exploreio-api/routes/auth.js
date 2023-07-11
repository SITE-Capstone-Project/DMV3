const express = require("express")
const auth = express.Router()

// Add authentication middleware
auth.get("/me", async (req, res, next) => {
    res.status(200).json({message: "Successfully connected"})
})

auth.post("/login", async (req, res, next) => {
    try {
        // Continue on user authentication later.

        //let user = await User.login(req.body)
        //const token = await User.generateAuthToken(user)
        //res.status(200).json({user, token})
    } catch(error) {
        next(error)
    }
})

auth.post("/register", async (req, res, next) => {
    try {
        // Continue on user authentication later.

        // let response = await User.register(req.body)
        // res.status(201).json(response)
    } catch(error) {
        next(error)
    }
})

module.exports = auth;