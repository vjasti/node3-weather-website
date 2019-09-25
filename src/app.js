const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express configuration
const staticDirpath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup static content path
app.use(express.static(staticDirpath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Ramakrishna'
    })
})
app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Ramakrishna'
    })
})
app.get('/help', (req,res) => {
    res.render('help',{
        helptext: 'Weather App Help',
        title: 'Help',
        name: 'Ramakrishna'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please enter address to get weater forecast'
        })
    }
    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forcastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forcastData,
                location
            })
        })
    })
})
app.get('/help/*', (req,res) => {
    res.render('404',{
        errorMsg: 'Help article not found',
        title: '404',
        name: 'Ramakrishna'
    })
})
app.get('*', (req,res) => {
    res.render('404',{
        errorMsg: 'Page not found',
        title: '404',
        name: 'Ramakrishna'
    })
})
app.listen(port, () => {
    console.log('Server is started and listiening on port no 3000')
})

