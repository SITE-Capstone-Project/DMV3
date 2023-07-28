const db = require("../config/database")
const { BadRequestError } = require("../utils/errors")

class Favorites {

    /* Grabbing all of the favorites of one user. */
    static grabFavoritesByID = async function(id) {
        const query = `SELECT * FROM favorites WHERE UserID = $1`
        const {rows} = await db.query(query,[id])
        return rows
    }

    static addFavorites = async function(destination, id) {
        /* Searching to see if the favorite already exists for that person in the database. */
        const searchQuery = `SELECT * FROM favorites WHERE (UserID = $1 AND name = $2)`
        console.log(destination)
        const {rows} = await db.query(searchQuery, [id, destination.name])

        if (rows.length == 0) {
            /* Inserting the new destination into favorites. */
            const query = `INSERT INTO favorites (UserID, destinationid, name, image, description, rating, region, country)
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
        const searchQuery = `SELECT * FROM favorites WHERE (UserID = $1 AND name = $2)`
        const {rows} = await db.query(searchQuery, [id, destination.name])

        /* If the favorite exists in the table, then remove it. */
        if (rows.length > 0) {
            const query = `DELETE FROM favorites WHERE (UserID = $1 AND name = $2)`
            const {rows} = await db.query(query, [id, destination.name])

            return rows[0]
        } else {
            throw new BadRequestError("Favorite doesn't exist")
        }
    }

    /* Checking if a user has already favorited a destination */
    static checkFavorited = async function(destination, id) {
        const searchQuery = `SELECT * FROM favorites WHERE (UserID = $1 AND name = $2)`
        const {rows} = await db.query(searchQuery, [id, destination.name])

        /* Return true if the query isn't empty */
        if (rows.length != 0) {
            return true
        }

        return false
    }
}

module.exports = Favorites