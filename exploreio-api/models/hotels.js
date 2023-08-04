const { TRAV_ADVISOR_KEY } = require("../config/config")
const axios = require("axios")

class Hotels {
    static async grabHotels(area, numAmount) {
        /* Setting up API call to grab relevant locations within a certain area. */
        const url = `https://api.content.tripadvisor.com/api/v1/location/search?searchQuery=${area}&category=hotels&language=en&key=${TRAV_ADVISOR_KEY}`
        const options = {method: 'GET', headers: {accept: 'application/json'}}
        let locations = {data: []}
        let locationIDs = []

        try {
            const data = await axios.get(url, options)
            const jsonDATA = await data?.data?.data
            let count = 0;
            
            if (jsonDATA) {
                /* Grabbing the location IDs from each element. */
                jsonDATA?.forEach((element) => {
                    let locationID = element.location_id
                    locationIDs.push(locationID)
                })

                /* For each TripAdvisor location ID, call the API to present comprehensive 
                information about the location, then grab the necessary information. */
                for (let i = 0; i < locationIDs.length; i++) {
                    const locationURL = `https://api.content.tripadvisor.com/api/v1/location/${locationIDs[i]}/details?language=en&key=${TRAV_ADVISOR_KEY}`
                    const locData = await axios.get(locationURL, options)

                    /* If the category of the location exists, and the 
                    category of the place is "hotel", use that information */
                    if (locData?.data?.category) {
                        if (locData?.data?.category?.name.toLowerCase() === "hotel") {
                            /* Creating a location object to fill in with relevant information. */
                            if (count < numAmount) {
                                let location = {name: "", rating: "", price_level: "", description: "", web_url: "", images: []}

                                const photosURL = `https://api.content.tripadvisor.com/api/v1/location/${locationIDs[i]}/photos?language=en&key=${TRAV_ADVISOR_KEY}`
                                const photoData = await axios.get(photosURL, options)

                                photoData?.data?.data?.forEach((element) => {
                                    location.images.push(element?.images?.large?.url)
                                })

                                /* Setting appropriate information */
                                location.name = locData?.data?.name
                                location.rating = locData?.data?.rating
                                location.price_level = locData?.data?.price_level
                                location.description = locData?.data?.description
                                location.web_url = locData?.data?.web_url
    
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