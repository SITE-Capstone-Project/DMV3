const express = require("express")
const user = express.Router()
const Favorites = require("../models/favorites")
const { authenticateJWT } = require("../middleware/security")

module.exports = user;