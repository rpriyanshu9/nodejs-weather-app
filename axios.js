const axios = require('axios').default

const instance = axios.create({
    baseURL: 'http://api.weatherstack.com/'
})

module.exports = instance