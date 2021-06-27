require('dotenv').config()
const getForwardGeocodingReq = require('./utils/geocode.js')
const getCurrentWeatherData = require('./utils/currentWeather.js')

const cityName = (process.argv[2])
if (!cityName) {
    console.log("Please provide an address via command line.")
    console.log('Example: node app.js "New Delhi"')
} else {
    getForwardGeocodingReq(cityName, (error, { longitude, latitude }) => {
        if (error) {
            return console.log(error)
        }
        getCurrentWeatherData(longitude, latitude, (err, data) => {
            if (err) {
                return console.log(err)
            }
            const { currentWeather, location } = data
            console.log(`At ${currentWeather.observation_time}, it is ${currentWeather.temperature} degrees out, with ${currentWeather.cloudcover}% cloud cover in ${cityName}, ${location.region}, ${location.country}.`)

        })
    })

}


