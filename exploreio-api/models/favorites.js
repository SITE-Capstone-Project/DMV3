const db = require("../config/database")
const { BadRequestError } = require("../utils/errors")

class Favorites {

    /* Grabbing all of the favorites of one user. */
    static getFavoritesByID = async function(id) {
        let fullResponse = []
        const query = `SELECT * FROM favorites WHERE userid = $1`
        const {rows} = await db.query(query,[id])

        for (let i = 0; i < rows.length; i++) {
            let oneFavorite = {destination: {}, activities: []}
            oneFavorite.destination = rows[i]
            oneFavorite.activities = await Favorites.getFavoriteActivities(rows[i].favoriteid)
            fullResponse.push(oneFavorite)
        }

        return fullResponse
    }

    static getFavoriteID = async function(id, destinationid) {
        const searchQuery = `SELECT * FROM favorites WHERE (userid = $1 AND destinationid = $2)`
        const {rows} = await db.query(searchQuery, [id, destinationid])

        if (rows[0]) {
            return rows[0]?.favoriteid
        }
        
        throw new BadRequestError("Favorite doesn't exist")
    }

    static addFavorites = async function(destination, id) {
        /* Searching to see if the favorite already exists for that person in the database. */
        const searchQuery = `SELECT * FROM favorites WHERE (userid = $1 AND name = $2)`
        const {rows} = await db.query(searchQuery, [id, destination.name])

        if (rows.length == 0) {
            /* Inserting the new destination into favorites. */
            const query = `INSERT INTO favorites (userid, destinationid, name, image, description, rating, region, country)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`

            const {rows} = await db.query(query, [id, destination.destinationid, destination.name, destination.image_url, destination.description,
            destination.rating, destination.region, destination.country])

            /* Returning the favorite. */
            return rows[0]
        } else {
            throw new BadRequestError("Favorite already exists in the list")
        }
    }

    static removeFavorites = async function(destination, id) {
        /* Searching to see if the favorite exists in the database to be removed. */
        const searchQuery = `SELECT * FROM favorites WHERE (userid = $1 AND name = $2)`
        const {rows} = await db.query(searchQuery, [id, destination.name])

        /* If the favorite exists in the table, then remove it. */
        if (rows.length > 0) {
            const query = `DELETE FROM favorites WHERE (userid = $1 AND name = $2)`
            const {rows} = await db.query(query, [id, destination.name])

            return rows[0]
        } else {
            throw new BadRequestError("Favorite doesn't exist")
        }
    }

    /* Checking if a user has already favorited a destination */
    static checkFavorited = async function(destination, id) {
        const searchQuery = `SELECT * FROM favorites WHERE (userid = $1 AND name = $2)`
        const {rows} = await db.query(searchQuery, [id, destination.name])

        /* Return true if the query isn't empty */
        if (rows.length > 0) {
            return true
        }

        return false
    }

    static getFavoriteActivities = async function(favoriteid) {
        const searchQuery = `SELECT * FROM activities WHERE (favoriteid = $1)`
        const {rows} = await db.query(searchQuery, [favoriteid])
        
        return rows
    }

    static addActivityToFavorite = async function(favoriteid, activity) {
        const searchQuery = `SELECT * FROM activities WHERE (favoriteid = $1)`
        const search_rows = await db.query(searchQuery, [favoriteid])

        if (search_rows?.rows?.length > 0) {
            for (let i = 0; i < search_rows.rows.length; i++) {
                if (search_rows.rows[i].activityinfo === activity) {
                    throw new BadRequestError("Activity already exists")
                }
            }
        }

        const query = `INSERT INTO activities (favoriteid, activityinfo) VALUES ($1, $2) RETURNING *;`
        const {rows} = await db.query(query, [favoriteid, activity])

        return rows[0]
    }

    static removeActivityFromFavorite = async function(favoriteid, activity) {
        const query = `DELETE FROM activities WHERE (favoriteid = $1 AND activityinfo = $2)`
        const {rows} = await db.query(query, [favoriteid, activity])

        return rows[0]
    }

}

module.exports = Favorites