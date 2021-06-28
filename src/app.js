require('dotenv').config()
const express = require('express')
const path = require('path')
const engine = require('ejs-mate')
const getForwardGeocodingReq = require('./utils/geocode')
const getCurrentWeatherData = require('./utils/currentWeather')

// Set up express app
const app = express()
const port = process.env.PORT || 3000

// Set up ejs engine and views
app.engine('ejs', engine)
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

// Set up static directory
app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
    res.render('index', { title: 'Weather', name: 'Priyanshu' })
})

app.get('/help', (req, res) => {
    res.render('help', { title: 'Help', name: 'Priyanshu' })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About', name: 'Priyanshu' })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address."
        })
    }
    const cityName = req.query.address
    getForwardGeocodingReq(cityName, (error, { longitude, latitude } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        getCurrentWeatherData(longitude, latitude, (err, { currentWeather, location } = {}) => {
            if (err) {
                return res.send({ error })
            }
            const q = req.query.address
            const cityName = q[0].toUpperCase() + q.slice(1)
            img_address = currentWeather.weather_icons[0]
            res.send({
                forecast: `${currentWeather.weather_descriptions[0]} at ${currentWeather.observation_time}. It is ${currentWeather.temperature} degrees out, with ${currentWeather.humidity}% humidity.`,
                location: `${cityName}, ${location.region}, ${location.country}`,
                image_src: img_address,
                address: cityName
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        page: 'help',
        path: '/help'
    })
})

app.get('/about/*', (req, res) => {
    res.status(404).render('404', {
        page: 'about',
        path: '/about'
    })
})

app.get('/weather/*', (req, res) => {
    res.status(404).render('404', {
        page: 'weather',
        path: '/weather'
    })
})

app.get('*', (req, res) => {
    res.status(404).render('404', {
        page: 'home',
        path: '/'
    })
})

app.listen(port, () => {
    console.log("Listening on" + port)
})

