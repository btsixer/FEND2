// Require Express to run server and routes
const express = require('express');

// Start up an instance of the Express server with variable app
const app = express();

// Setup the Express server on port 3030 // Note: "build-prod"
const port = 3030;
const server = app.listen(port, listening);

function listening(){
    // console.log(server);
    console.log(`Front end developer final project: running on localhost: ${port}`);
};

// Require the dotenv file for the Express server to work
const dotenv = require('dotenv');
dotenv.config();

// Require bodyParser
const bodyParser = require('body-parser');

// Require Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Require fetch in the node environment
const fetch = require('node-fetch');

// *****************
// /* Middleware */
// *****************
// // Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
// app.use(express.static('website'));

// Access and build to /dist folder
app.use(express.static('dist'));

// *****************
// /* Server */
// *****************
// Simple /GET to review server functionality when setting up the project initially
// app.get("/", (req, res)=> {
//     res.send("Hello World!")
// })

// *****************
// /* Global */
// *****************
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// getData function
const getData = async (url) => {
    const response = await fetch(url);
    try {
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

// Function to complete GET /all for user input on travel details
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

// Function to complete POST /all for user input on travel details
app.post('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

app.post('/geoNames', (req, res) => {
    console.log('\n*************** GEONAMES START ***************');
    console.log("GeoNames request: ", req.body);
    const url = `http://api.geonames.org/searchJSON?q=${req.body.placenameCity.toUpperCase()}&adminCode1=${req.body.placenameState.toUpperCase()}&maxRows=1&username=${process.env.GEONAMES_API_ID}`;
    console.log(url);
    getData(url).then(response => {
        console.log('Data from geoNames[0]')
        console.log(response.geonames[0].lat);
        console.log(response.geonames[0].lng);
        // Send back to client for /all variables in one place
        projectData.lat = response.geonames[0].lat;
        projectData.long = response.geonames[0].lng;
        // Send back to client for /geoNames variables
        res.send({lat:response.geonames[0].lat, long:response.geonames[0].lng});
        console.log('*************** GEONAMES FINISH ***************\n');
    }).catch(error => {
        res.send(JSON.stringify({error: error}))
    });
});

app.post('/weatherBit', (req, res) => {
    console.log('\n*************** WEATHERBIT START ***************');
    console.log('WeatherBit request: ', req.body);
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.body.lat}&lon=${req.body.long}&key=${process.env.WEATHERBIT_API_KEY}`;
    console.log(url);
    getData(url).then(response => {
        console.log('Data from weatherBit[0]');
        // Convert string to integer and calculate Fahrenheit temperature
        let minTempC = Number(response.data[0].min_temp);
        let minTempF = Math.round((minTempC*9/5)+32);
        let maxTempC = Number(response.data[0].max_temp);
        let maxTempF = Math.round((maxTempC*9/5)+32);
        minTemp = response.data[0].min_temp;
        maxTemp = response.data[0].max_temp;
        console.log(minTemp);
        console.log(maxTemp);
        console.log(minTempF + 'F');
        console.log(maxTempF + 'F');
        // Send back to client for /all variables in one place
        projectData.minTempF = minTempF;
        projectData.maxTempF = maxTempF;
        // Send back to client for /weatherBit variables
        res.send({minTempF, maxTempF});
        console.log('*************** WEATHERBIT FINISH ***************\n');
    }).catch(error => {
        res.send(JSON.stringify({error: error}))
    });
});

app.post('/pixabay', (req, res) => {
    console.log('\n*************** PIXABAY START ***************');
    const url = `https://pixabay.com/api/?key=${process.env.PIXABAY_API_KEY}&q=${req.body.placenameCity.toUpperCase()}&image_type=photo`
    console.log(url);
    getData(url).then(response => {
        console.log("Data from pixabay[0]");
        console.log(response.hits[0].webformatURL);
        // Send back to client for /all variables in one place
        projectData.pixabayImage = response.hits[0].webformatURL;
        // Send back to client for /pixabay variables
        res.send({pixabayImage: response.hits[0].webformatURL});
        console.log('*************** PIXABAY FINISH ***************\n');
    }).catch(error => {
        res.send(JSON.stringify({error: error}))
    });
})

app.post('/createTrip', (req, res) => {
  console.log(req.body);

  // targeting the days of date to get the difference
  console.log(req.body.startDate);
  console.log(req.body.endDate);
  console.log(req.body.duration);

  const startDays = req.body.startDate.slice(0, 10);
  const endDays = req.body.endDate.slice(0, 10);

  projectData.location = req.body.location;
  projectData.startDate = startDays;
  projectData.endDate = endDays;
  projectData.duration = req.body.duration;

  console.log(projectData);
  res.send('ok');
});

// // Add a GET route that returns the geoNames location data into lat / long variables for the next API
// // Following code works as a /GET to the geonames endpoint
// app.get('/geoNames', (req, res) => {
//     console.log('GET geonames is working!');
//     // **************** Using query parameters on the client.js file will pass the data to the server through "req.query" as below
//     // **************** console.log("Req: ", req.query)
//     // **************** Now, entries from the req.query parameters will be callable in the url as below, 
//     // **************** const url = `http://api.geonames.org/searchJSON?q=${req.query.placename}&maxRows=1&username=${process.env.GEONAMES_API_ID}`
//     console.log("Req: ", req.query);
//     const url = `http://api.geonames.org/searchJSON?q=${req.query.placename}&maxRows=1&username=${process.env.GEONAMES_API_ID}`;
//     console.log(url);
//     getData(url).then(response => {
//         console.log('Data from Genames[0]')
//         console.log(response.geonames[0]);
//         projectData.lat = response.geonames[0].lat;
//         projectData.long = response.geonames[0].lng;

//         console.log('projectData is: ', projectData);
//         res.send(true);
//     }).catch(error => {
//         res.send(JSON.stringify({error: error}))
//     });
// });