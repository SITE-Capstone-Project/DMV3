const db = require("../config/database")
const { Duffel } = require("@duffel/api")
const {DUFFEL_API_KEY} = require("../config/config")
const { ExpressError, NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors")

const duffel = new Duffel({
    token: DUFFEL_API_KEY
})

class Flights {

    /*
        Important parts are the slices, passengers, etc... as parameters to request the API.

        slices: Array of objects. Each object has an origin, destination, and departure date.
            NOTE: Take out the corresponding destination airline IATA code from database.

        passengers: Array of objects. Each object has a type/age depending on how many people. 
            EX: {type="adult"}
                If not adult, {age=14}

        Cabin class options: first, business, premium_economy, and economy
        
        REQUEST OBJECT SCHEMA EXAMPLE:

        {
            "IATA": "ORD",
            "destination": "New York City", <-- THIS CAN BE ANY CITY IN THE DATABASE
            "departDate": "YYYY-MM-DD",
            "returnDate": "YYYY-MM-DD",
            "numAdults": 2,
            "children": [13,12,6],
            "cabin_class": "economy"
        }
    */

    static async getFlights(variables, numFlights) {
        const requiredFields = ["IATA", "destination", "departDate", "returnDate", "numAdults", "children", "cabin_class"]

        requiredFields.forEach((element) => {
            if (!variables.hasOwnProperty(element)) {
                throw new BadRequestError("Missing required fields.")
            }
        })

        if (variables.IATA.length != 3) {
            throw new BadRequestError("Invalid IATA Code.")
        }
        if (variables.numAdults <= 0) {
            throw new BadRequestError("You must have an adult to fly with.")
        }
        variables.children.forEach((child) => {
            if (child > 17) {
                throw new BadRequestError("Children are younger than 18 years of age.")
            }
        })

        let flightInfo = {
            slices: [], 
            passengers: [], 
            cabin_class:"",
            max_connections: 0, 
            return_offers:true,
        }

        const query = `SELECT airlines FROM destinations WHERE name = $1`
        const {rows} = await db.query(query, [variables.destination])
        let destinationIATA = rows[0].airlines

        /* Setting up traveling slice */
        let departSlice = {
            origin: variables.IATA, 
            destination: destinationIATA, 
            departure_date: variables.departDate
        }
        flightInfo.slices.push(departSlice)

        /* Setting up return slice */
        let returnSlice = {
            origin: destinationIATA, 
            destination: variables.IATA, 
            departure_date: variables.returnDate
        }
        flightInfo.slices.push(returnSlice)

        /* Adding adults to offer request/search */
        for (let i = 0; i < variables.numAdults; i++) {
            const adult = {type: "adult"}
            flightInfo.passengers.push(adult)
        }

        /* Adding children to offer request/search */
        variables.children.forEach((childAge) => {
            const child = {age: childAge}
            flightInfo.passengers.push(child)
        })

        /* Adding cabin class to offer request/search */
        flightInfo.cabin_class = variables.cabin_class

        const response = await duffel.offerRequests.create(flightInfo)

        let list = await duffel.offers.list({
            offer_request_id: response.data.id,
            limit: numFlights
        })

        let allFlights = []

        /*
            Taking select things from flights:
            total_amount, owner.name, owner.logo_symbol_url. 
        */

        list["data"].forEach((flight) => {
            let depDate = new Date(flight?.slices[0]?.segments[0]?.departing_at)
            let arrDate = new Date(flight?.slices[0]?.segments[0]?.arriving_at)
            let finalTime = (Math.abs(arrDate.getTime() - depDate.getTime()) / 1000) / 60
            let oneFlight = {name: flight.owner.name,
                logo: flight.owner.logo_symbol_url,
                totalAmount: flight.total_amount,
                depIATA: flight?.slices[0]?.segments[0]?.origin.iata_code,
                arrIATA: flight?.slices[0]?.segments[0]?.destination.iata_code,
                depTime: flight?.slices[0]?.segments[0]?.departing_at,
                arrTime: flight?.slices[0]?.segments[0]?.arriving_at,
                totalTime: finalTime
            }
            allFlights.push(oneFlight)
        })

        return allFlights
    }

}

module.exports = Flights