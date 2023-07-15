const express = require("express")
const router = express.Router()
const Destinations = require("../models/destinations")
const { ExpressError, NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors")

/*
    Routes for Exploreio.
*/

/*
    /destinations should return all of the destinations currently in the database.

    Each destination will have the following: Title, description, categories (region, etc...), image URL, image background URL,
    and rating.
*/
router.get("/destinations", async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
})

/*
    /destination/:id returns the information of the destination with id mentioned in the parameter.

    Destination will have the following: Title, description, categories (region, etc...), image URL, image background URL,
    and rating. Moreover, will return the ChatGPT and Google Maps information.
*/
router.get("/destination/:id", async (req, res, next) => {
    try {
    
    } catch (error) {
        next(error);
    }
})

/*
    /flights will return a maximum of 5 flights matching parameters given in the body.
*/
router.post("/flights", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
})

/*
    /hotels will return a maximum of 5 hotels matching parameters given in the body.
*/
router.post("/hotels", async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error);
    }
})

/* /favorites implemented later */

module.exports = router;