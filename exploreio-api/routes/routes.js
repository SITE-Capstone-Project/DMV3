const express = require("express")
const router = express.Router()
const Destinations = require("../models/destinations")
const Hotels = require("../models/hotels")
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
        const response = await Destinations.getAllDestinations()
        res.status(200).json(response)
    } catch (error) {
        next(error);
    }
})

/*
    /destination/:id returns the information of the destination with id mentioned in the parameter.

    Destination will have the following: Title, description, categories (region, etc...), image URL, image background URL,
    and rating. Moreover, will return the ChatGPT information.
*/
router.get("/destinations/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const fullResponse = {destinationInfo: [], destinationActivities: [], hotels: []}

        if (!id) {
            throw new BadRequestError("ID not provided")
        }

        /* Should initially call the already preoccupied table to see if the destination
        information already exists. */
        const cached = await Destinations.getCachedInfo(id)

        if (cached) {
            const response = JSON.parse(cached)
            res.status(200).json(response)
        } else {
            const response = await Destinations.getDestinationById(id)
            fullResponse.destinationInfo = response

            /* ChatGPT generates activities here */
            const activities = await Destinations.getActivities(response.name)
            fullResponse.destinationActivities = activities

            const hotels = await Hotels.grabHotels(response.name)
            fullResponse.hotels = hotels 

            /* Now, add into cache */
            Destinations.addIntoCache(fullResponse)
            res.status(200).json(fullResponse)
        }
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