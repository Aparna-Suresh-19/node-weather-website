//section 43 hello express -begin

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//setup port for heroku and localhost
const port = process.env.PORT || 3000


//setup path for the folder
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express();

//setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//To get the file from another directory static pages
app.use(express.static(publicDirectoryPath))

//for dynamic page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        description: 'Get your weather details here!',
        name: 'Aparna'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Aparna'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Need Help?',
        name: 'Aparna'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide a location'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            console.log(error)
            // return res.send({
            //     error: error
            // })
            //instead we can use shortcut method
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location: location,
                place: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide the search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'Help article not found'
    })
})

// other route which is not defined above (eg localhost:3000/me) always at the end of all defined routes
app.get('*', (req, res) => {
    res.render('error', {
        errorMsg: 'My 404 Page'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// app.get('/help',(req,res)=>{
//     res.send([{
//         name: 'Aparna',
//         age: 23
//     },{
//         name: 'Akshay',
//         age:26
//     }])
// })

// app.get('/about',(req,res)=>{
//     res.send('<h2>About Page</h2>')
// })


//section 43 hello express -end
