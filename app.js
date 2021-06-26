require('dotenv').config()
const axios = require('axios')

const getReq = async (coordinates, city) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates[1]}&lon=${coordinates[0]}&appid=${process.env.API_KEY}&units=metric`)
        const data = response.data
        console.log(`It is currently ${data.main.temp} degrees out, with ${data.main.humidity}% humidity in ${city}.`)
    } catch (e) {
        console.log(e)
    }
}

const forwardGeocodingReq = async (cityName) => {
    try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?access_token=${process.env.ACCESS_TOKEN}`)
        return response.data.features[0].center
    } catch (error) {
        console.log(error)
        return []
    }
}

forwardGeocodingReq("Aligarh").then((res) => {
    getReq(res, city)
})


