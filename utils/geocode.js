const axios = require('axios')

const getForwardGeocodingReq = async (cityName, callback) => {
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(cityName)}.json?access_token=${process.env.ACCESS_TOKEN}`
        const response = await axios.get(url)
        const { features } = response.data
        callback(undefined, {
            latitude: features[0].center[1],
            longitude: features[0].center[0]
        })
    } catch (error) {
        callback("Something went wrong", undefined)
    }
}

module.exports = getForwardGeocodingReq