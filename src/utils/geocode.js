const axios = require('axios')

const getForwardGeocodingReq = async (cityName, callback) => {
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cityName)}.json?access_token=${process.env.ACCESS_TOKEN}`
        const response = await axios.get(url)
        const { features } = response.data
        if (features.length === 0) {
            return callback(`Something went wrong! Unable to find location. Try another search.`, undefined)
        }
        else if (features[0].place_type[0] !== 'place') {
            return callback(`Something went wrong! Unable to find location. Try another search.`, undefined)
        }
        callback(undefined, {
            latitude: features[0].center[1],
            longitude: features[0].center[0]
        })
    } catch (error) {
        callback(`Something went wrong! ${error.response.data.message}`, undefined)
    }
}

module.exports = getForwardGeocodingReq