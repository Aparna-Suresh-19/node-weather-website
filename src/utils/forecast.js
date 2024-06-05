// callback abstraction challenge - begin
const request = require('request')

//section 40 destructing and shortcut challenge -begin

const forecast = (x, y, callback) => {

const url = 'http://api.weatherstack.com/current?access_key=6b6787b01c9b05596adccd24a783be24&query=' + x + ',' + y;
request({ url, json: true }, (error, {body}) => {
    if (error) {
        callback('Unable to fetch weather service!', undefined)
    } else if (body.error) {
        callback('Missing mandatory parameters!', undefined)
    } else {
        const currentData = body.current;
        callback(undefined, currentData.weather_descriptions[0] + ". It's currently " + currentData.temperature + " degrees out and it's feels like " + currentData.feelslike + ' degrees out.')
    }
})
}

//section 40 destructing and shortcut challenge -end


// const forecast = (x, y, callback) => {

//     const url = 'http://api.weatherstack.com/current?access_key=6b6787b01c9b05596adccd24a783be24&query='+ x + ','+ y;
//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to fetch weather service!',undefined)
//         } else if (response.body.error) {
//             callback('Missing mandatory parameters!',undefined)
//         } else {
//             const currentData = response.body.current;
//             callback(undefined,currentData.weather_descriptions[0] + ". It's currently " + currentData.temperature + " degrees out and it's feels like " + currentData.feelslike + ' degrees out.')
//         }
//     })
// }


module.exports = forecast

// callback abstraction challenge - end
