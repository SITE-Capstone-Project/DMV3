const express = require("express")
const auth = express.Router()

auth.get("/me", async (req, res, next) => {
    res.status(200).json({message: "Successfully connected"})
})

auth.post("/login", async (req, res, next) => {  
    try {
        // Continue on user authentication after working with API.

        //let user = await User.login(req.body)
        //const token = await User.generateAuthToken(user)
        //res.status(200).json({user, token})
    } catch(error) {
        next(error)
    }
})

auth.post("/register", async (req, res, next) => {
    try {
        // let response = await User.register(req.body)
        // res.status(201).json(response)
    } catch(error) {
        next(error)
    }
})

module.exports = auth;