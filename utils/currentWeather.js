const axios = require('axios')

const getCurrentWeatherData = async (long, lat, callback) => {
    try {
        const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${lat},${long}`;
        const response = await axios.get(url)
        if (!response.data.current) {
            callback(response.data.error.info, undefined)
        } else {
            callback(undefined, {
                currentWeather: response.data.current,
                location: response.data.location
            })
        }
    } catch (e) {
        callback('Something went wrong!!', undefined)
    }
}

module.exports = getCurrentWeatherData