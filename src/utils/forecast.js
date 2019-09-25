const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/ff6d3fd1652aab30f9a00aa9c2da8ff8/${lat},${lng}?units=si`
   
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to weater forecast service', undefined)
        } else if(body.code) {
            callback(body.error, undefined)
        } else {
            var summary = `${body.daily.data[0].summary} Currently there is ${body.currently.precipProbability%100}% probability of rain and today's max and min temparatures are ${body.daily.data[0].temperatureHigh}c and ${body.daily.data[0].temperatureLow}c`
            callback(undefined, summary)
        }
    })
    
}

module.exports = forecast