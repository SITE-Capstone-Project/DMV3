const { TRAV_ADVISOR_KEY } = require("../config/config")
import fetch from "node-fetch"

class Hotels {
    static async grabHotels(area, numAmount) {
        /* Setting up API call to grab relevant locations within a certain area. */
        const url = `https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=${area}&category=hotels&language=en&key=${TRAV_ADVISOR_KEY}`
        const options = {method: 'GET', headers: {accept: 'application/json'}}
        let locations = {data: []}
        let locationIDs = []

        try {
            const data = await fetch(url, options)
            const jsonDATA = await data.json()
            let count = 0;
            
            if (jsonDATA) {
                /* Grabbing the location IDs from each element. */
                jsonDATA["data"].forEach((element) => {
                    let locationID = element.location_id
                    locationIDs.push(locationID)
                })

                /* For each TripAdvisor location ID, call the API to present comprehensive 
                information about the location, then grab the necessary information. */
                for (let i = 0; i < locationIDs.length; i++) {
                    const locationURL = `https://api.content.tripadvisor.com/api/v1/location/${locationIDs[i]}/details?language=en&key=${TRAV_ADVISOR_KEY}`
                    const locData = await fetch(locationURL, options)
                    const locDataJSON = await locData.json()

                    /* If the category of the location exists, and the 
                    category of the place is "hotel", use that information */
                    if (locDataJSON["category"]) {
                        if (locDataJSON["category"].name.toLowerCase() === "hotel") {
                            /* Creating a location object to fill in with relevant information. */
                            if (count < numAmount) {
                                let location = {name: "", rating: "", price_level: "", description: "", web_url: "", images: []}

                                const photosURL = `https://api.content.tripadvisor.com/api/v1/location/${locationIDs[i]}/photos?language=en&key=${TRAV_ADVISOR_KEY}`
                                const photoData = await fetch(photosURL, options)
                                const photoDataJSON = await photoData.json()

                                photoDataJSON?.data?.forEach((element) => {
                                    location.images.push(element?.images?.large?.url)
                                })

                                /* Setting appropriate information */
                                location.name = locDataJSON["name"]
                                location.rating = locDataJSON["rating"]
                                location.price_level = locDataJSON["price_level"]
                                location.description = locDataJSON["description"]
                                location.web_url = locDataJSON["web_url"]
    
                                /* Pushing the location object into the locations array */
                                locations.data.push(location)
                                count++;
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
            return locations
        } catch (error) {
            console.log(error)
        } finally {
            return locations
        }
    }

}

module.exports = Hotels