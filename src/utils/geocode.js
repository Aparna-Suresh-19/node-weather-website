//section 36 callback abstraction -begin
const request = require('request')

//section 40 destructing and shortcut challenge - begin

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXBhcm5hc3VyZXNoMDAwMiIsImEiOiJjbHd5dHczb3QwMGFrMmlzZWEycnRwencyIn0.uHcLMTxpRuMVXAEP37KC2g&limit=1';

    request({url,json: true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect to service!', undefined)
        } else if(body.features.length === 0) {
            callback('Location doesnot exist. Try again!',undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

//section 40 destructing and shortcut challenge - end


// const geocode = (address,callback) => {
//     const geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXBhcm5hc3VyZXNoMDAwMiIsImEiOiJjbHd5dHczb3QwMGFrMmlzZWEycnRwencyIn0.uHcLMTxpRuMVXAEP37KC2g&limit=1';

//     request({url: geocodingUrl,json: true}, (error,response) => {
//         if (error) {
//             callback('Unable to connect to service!', undefined)
//         } else if(body.features.length === 0) {
//             callback('Location doesnot exist. Try again!',undefined)
//         } else {
//             callback(undefined,{
//                 latitude: body.features[0].center[1],
//                 longitude: body.features[0].center[0],
//                 location: body.features[0].place_name
//             })
//         }
//     })
// }

module.exports = geocode

//section 36 callback abstraction - end
