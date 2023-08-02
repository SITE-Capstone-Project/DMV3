const express = require("express")
const router = express.Router()
const Destinations = require("../models/destinations")
const Hotels = require("../models/hotels")
const Flights = require("../models/flights")
const Favorites = require("../models/favorites")
const { ExpressError, NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors")
const { authenticateJWT } = require("../middleware/security")

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
        next(error)
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
        next(error)
    }
})

/* 
    GET /favorites will grab a user's favorites if the user exists.
*/
router.get("/favorites", authenticateJWT, async (req, res, next) => {
    try {
        const userID = req.user.id
        const response = await Favorites.getFavoritesByID(userID)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

/* 
    POST /favorites will add a favorite destination to the user, if the user
    doesn't already have the favorited item there.

    Example body: 
    {
        "destinationid": 2,
        "name": "Los Angeles",
        "rating": 4,
        "description": "Located in California, it is the second-largest city in the United States and is 
        renowned for the entertainment industry, including Hollywood, as well as its pleasant 
        climate and beautiful beaches.",
        "image_url": "",
        "back_url": "",
        "region": "NA",
        "country": "USA",
    }
*/
router.post("/favorites", authenticateJWT, async (req, res, next) => {
    try {
        const userID = req.user.id
        const destination = req.body
        const response = await Favorites.addFavorites(destination, userID)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

/*
    DELETE /favorites will delete a favorited destination from the user, if the user
    already has a favorited item existing in the database.

    Example body:
    {
        "name": "Los Angeles"
    }
*/
router.delete("/favorites", authenticateJWT, async (req, res, next) => {
    try {
        const userID = req.user.id
        const destination = req.body
        const response = await Favorites.removeFavorites(destination, userID)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

/*

POST /activities adds an activity to a Favorite

Example body:
{
    "id": 2, <- DESTINATION ID
    "activityinfo": JSON STRING (to be parsed), '{"type": activity/hotel, "info": information}'
}
*/
router.post("/activities", authenticateJWT, async (req, res, next) => {
    try {
        const userID = req.user.id
        const destination = req.body
        const favoriteid = await Favorites.getFavoriteID(userID, destination?.id)
        const response = await Favorites.addActivityToFavorite(favoriteid, destination?.activityinfo)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

/*

DELETE /activities removes an activity from a Favorite

Example body:
{
    "id": 2, <- DESTINATION ID
    "activityinfo": JSON STRING (to be parsed), '{"type": activity/hotel, "info": information}'
}
*/
router.delete("/activities", authenticateJWT, async (req, res, next) => {
    try {
        const userID = req.user.id
        const destination = req.body
        const favoriteid = await Favorites.getFavoriteID(userID, destination?.id)
        const response = await Favorites.removeActivityFromFavorite(favoriteid, destination?.activityinfo)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

module.exports = router;