const db = require("../config/database")
const { GPT_API_KEY } = require("../config/config")
const { Configuration, OpenAIApi } = require("openai")
const { ExpressError, NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors")

const configuration = new Configuration({
    apiKey: GPT_API_KEY,
})
const openai = new OpenAIApi(configuration)

class Destinations {
    static async getAllDestinations() {
        const query = `SELECT * FROM destinations;`
        const {rows} = await db.query(query, [])
        return rows;
    }

    static async getDestinationById(id) {
        const query = `SELECT * FROM destinations WHERE DestinationID = $1;`
        const {rows} = await db.query(query, [id])
        if (rows.length == 0) {
            throw new BadRequestError("Destination does not exist")
        }

        return rows[0]
    }

    static async getActivities(area) {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `Give me a list of the top 5 tourist attractions in ${area}. 
            For each item, give me a super short description of the attraction. 
            Give me only the list of items, with their descriptions. Nothing else.`,
            max_tokens: 500,
            temperature: 0,
        })

        /* Grabbing the response string from ChatGPT */
        let responseString = response.data.choices[0].text

        /* Formatting the string to remove the first two new line characters (\n) */
        let normalized = responseString.substring(2, responseString.length)

        /* Do more string manipulation to retrieve and format into a list */
        let finalInfo = normalized.split("\n");

        finalInfo.forEach((element, index) => {
            finalInfo[index] = element.substring(3, element.length);
        })

        return finalInfo
    }

    static async getCachedInfo(id) {
        const query = `SELECT * FROM destination_info WHERE DestinationID = $1;`
        const {rows} = await db.query(query, [id])
        return (rows.length != 0 ? rows[0].information: undefined)
    }

    static async addIntoCache(dest) {
        const query = `INSERT INTO destination_info (DestinationID, information) VALUES ($1,$2) RETURNING *;`
        const {rows} = await db.query(query, [dest.destinationInfo.destinationid, JSON.stringify(dest)])
        return rows[0]
    }
}

module.exports = Destinations