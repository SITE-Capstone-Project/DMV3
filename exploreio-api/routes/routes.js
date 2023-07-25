const express = require("express")
const router = express.Router()
const Destinations = require("../models/destinations")
const Hotels = require("../models/hotels")
const Flights = require("../models/flights")
const { ExpressError, NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors")

/*
    Routes for Exploreio.
*/

/*
    /destinations should return all of the destinations currently in the database.

    Each destination will have the following: Title, description, categories (region, etc...), 
    image URL, image background URL, and rating.
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

    Destination will have the following: Title, description, categories (region, etc...), 
    image URL, image background URL, and rating. Moreover, will return the ChatGPT information and hotels
    in the area.
*/
router.get("/destinations/:id", async (req, res, next) => {
    try {
        const id = req.params.id
        const fullResponse = {destinationInfo: [], 
            destinationActivities: [], hotels: []}

        if (!id) {
            throw new BadRequestError("ID not provided")
        }

        /* Should initially call the already preoccupied 
        table to see if the destination information already exists. */
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

            /* Grabbing hotels */
            const hotels = await Hotels.grabHotels(response.name, 5);
            fullResponse.hotels = hotels 

            /* Now, add into cache */
            Destinations.addIntoCache(fullResponse)
            
            /* Send response back */
            res.status(200).json(fullResponse)
        }
    } catch (error) {
        next(error);
    }
})

/*
    /flights will return a maximum of however many flights matching parameters given in the body.
*/
router.post("/flights", async (req, res, next) => {
    try {
        const response = await Flights.getFlights(req.body, 5)
        res.status(200).json(response)
    } catch (error) {
        next(error);
    }
})

/*
    /hotels will return a single hotel from a destination area.

    EXAMPLE REQUEST BODY:

    {
        area: "New York City"
    }
*/
router.post("/hotels", async (req, res, next) => {
    try {
        const area = req.body.area
        const response = await Hotels.grabHotels(area, 1)
        res.status(200).json(response)
    } catch (error) {
        next(error);
    }
})

/* /favorites implemented later */

module.exports = router;