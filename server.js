require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios');
const PORT = 8000;



// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));

console.log('process.env:', process.env.API_KEY)
console.log(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.API_KEY}`)
// Routes
app.get('/', function(req, res) {
  // res.send('Hello, backend!');
  res.render('index.ejs')
});


app.get('/search', (req, res) => {
  // console.log(req.query)
  let searchTerm = req.query.search;
  let url = "http://www.omdbapi.com/?s=" + searchTerm + `&apikey=${process.env.API_KEY}`;
  axios.get(url)
    .then(response => {
      console.log(response.data)
      res.render('results.ejs', {
        input: req.query.userInput,
        people: response.data.results
      })
    })
    .catch(console.error)
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 8000);

// We can export this server to other servers like this
module.exports = server;
