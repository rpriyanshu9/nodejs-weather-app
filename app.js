require('dotenv').config()
const axios = require('./axios')

const getReq = async () => {
    try {
        const response = await axios.get(`http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=New York`)
        console.log(response.data)
    } catch (e) {
        console.log(e)
    }
}

getReq()

