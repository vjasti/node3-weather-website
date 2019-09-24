const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = `https://api.darksky.net/forecast/ff6d3fd1652aab30f9a00aa9c2da8ff8/${lat},${lng}`
   
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect to weater forecast service', undefined)
        } else if(body.code) {
            callback(body.error, undefined)
        } else {
            var summary = `Currently ${body.currently.summary} with ${body.currently.precipProbability*100}% of ${body.currently.precipType}`
            callback(undefined, summary)
        }
    })
    
}

module.exports = forecast