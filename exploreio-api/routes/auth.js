const express = require("express")
const auth = express.Router()
const User = require("../models/user")
const { authenticateJWT } = require("../middleware/security")

/* 

    For /me, quick check to see if the user is authenticated.

*/

auth.get("/me", authenticateJWT, async (req, res, next) => {
    try {
        res.status(200).json({message: "Successfully connected"})
    } catch (error) {
        next(error)
    }
})

/*

For logging in, user body should follow this format:

    {
        "email": "email@email.com",
        "password": "password",
    }

*/

auth.post("/login", async (req, res, next) => {
    try {
        let user = await User.login(req.body)
        const token = await User.generateAuthToken(user)
        res.status(200).json({user, token})
    } catch(error) {
        next(error)
    }
})


/*

For registering, user body should follow this format:

    {
        "username": "user",
        "email": "email@email.com",
        "password": "password",
        "first_name": "first",
        "last_name": "last"
    }

*/

auth.post("/register", async (req, res, next) => {
    try {
        let response = await User.register(req.body)
        res.status(201).json(response)
    } catch(error) {
        next(error)
    }
})

module.exports = auth;