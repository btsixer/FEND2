const getData = async (url) => {
  const response = await fetch(url);
  try {
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    alert("We are experiencing technical difficulties, please be patient as we work to resolve the errors.");
    console.log("error", error);
  }
};
  
const postData = async ( url='', data={})=>{
      const response = await fetch(url, {
          method: 'POST',
          // credentials: 'same-origin',
          headers: {
              'Content-Type': 'application/json',
          },
          // Body data type must match "Content-Type" header
          body: JSON.stringify(data)
      });
      try {
          const newData = await response.json();
          console.log(newData);
          return newData;
        } catch (error) {
          alert("We are experiencing technical difficulties, please be patient as we work to resolve the errors.");
          console.log("error", error);
        };
};
  
const updateUI = async (url) => {
    console.log('UpdateUI function starting');
    const city = document.getElementById('input-destination-city').value;
    const cityCap = city[0].toUpperCase() + city.substring(1)
    const state = document.getElementById('input-destination-state').value;
    const departureDate = document.getElementById('input-date').value;
    const returnDate = document.getElementById('input-return-date').value;
    const currentDate = new Date();
    const tripDuration = new Date(returnDate).getTime() - new Date(departureDate).getTime();
    const daysInTravel = tripDuration / (1000 * 60 * 60 * 24);
    const daysFromToday = new Date(departureDate).getTime() - new Date(currentDate).getTime();
    const daysOut = Math.ceil(daysFromToday / (1000 * 60 * 60 * 24));
    const response = await fetch(url);
    try {
      const data = await response.json();
      console.log(data);
      document.getElementById('results-city-state').innerHTML = `Hello, your trip details are below. You would like to travel to ${cityCap}, ${state.toUpperCase()}.`;
      document.getElementById('my-trip-image').src = `${data.pixabayImage}`;
      document.getElementById("result-departure").innerHTML = `Your departure date: ${departureDate}.`
      document.getElementById("result-return").innerHTML = `Your return date: ${returnDate}.`
      document.getElementById("result-length").innerHTML = `The length of your trip is ${daysInTravel} days and you are scheduled to depart in ${daysOut} days.`
      // Convert string to integer and calculate Fahrenheit temperature
      const getMaxTemp = Number(data.forecastTemp[daysOut].max_temp);
      const maxTempF = Math.round((getMaxTemp*9/5)+32);
      const getMinTemp = Number(data.forecastTemp[daysOut].min_temp);
      const minTempF = Math.round((getMinTemp*9/5)+32);
      document.getElementById("forecast-high").innerHTML = `The forecast high temperature in ${cityCap}, ${state.toUpperCase()} in ${daysOut} days is: ${maxTempF}&#176;F.`
      document.getElementById("forecast-low").innerHTML = `The forecast low temperature in ${cityCap}, ${state.toUpperCase()} in ${daysOut} days is: ${minTempF}&#176;F.`
    } catch (error) {
      alert("We are experiencing technical difficulties, please be patient as we work to resolve the errors.");
      console.log("error", error);
    }
};
  
  /* Global Variables */
  // const travelCard = document.getElementById('input-submit');
  // const travelResults = document.getElementById('travel-results');
  
  // Async function to manage user input and store client side variables
  async function handleSubmit(event) {
    // Set submit data into key variables
    const city = document.getElementById('input-destination-city').value;
    const state = document.getElementById('input-destination-state').value;
    const departureDate = document.getElementById('input-date').value;
    const returnDate = document.getElementById('input-return-date').value;
    // Create a new date instance dynamically with javascript
    const currentDate = new Date();
    const newDate = currentDate.getMonth() + "-" + currentDate.getDate() + "-" + currentDate.getFullYear();
    console.log(`newDate: ${newDate}`);
    // Calculate the travel duration
    const startDate = new Date(departureDate);
    const endDate = new Date(returnDate);
    const tripDuration = endDate.getTime() - startDate.getTime();
    const daysInTravel = tripDuration / (1000 * 60 * 60 * 24);
    const daysFromToday = startDate.getTime() - currentDate.getTime();
    const daysOut = Math.ceil(daysFromToday / (1000 * 60 * 60 * 24));
    // Console log all values for reference
    console.log(`city: ${city}`);
    console.log(`state: ${state}`);
    console.log(`departureDate:  ${departureDate}`);
    console.log(`returnDate:  ${returnDate}`);
    console.log(`daysInTravel: ${daysInTravel}`);
    console.log(`daysFromToday: ${daysOut}`);
    console.log(`Form Submitted! Time stamp: ${event.timeStamp}`);
    // Pass key variables into the chained promises, display to console to validate client side can read the variables.
    let placenameData = {
      placenameCity: city,
      placenameState: state
    };
    const coord = await postData('http://localhost:3030/geoNames', placenameData);
    // console.log(`The latitude of ${city.toUpperCase()}, ${state.toUpperCase()} is:  ${coord.lat}.`);
    // console.log(`The longitude of ${city.toUpperCase()}, ${state.toUpperCase()} is:  ${coord.long}.`);
    const fcst = await postData('http://localhost:3030/weatherBit', coord);
    // console.log(`The forecast low temperature for ${city.toUpperCase()}, ${state.toUpperCase()} today is: ${fcst.minTempF} F`);
    // console.log(`The forecast high temperature for ${city.toUpperCase()}, ${state.toUpperCase()} today is: ${fcst.maxTempF} F`);
    const picture = await postData('http://localhost:3030/pixabay', placenameData);
    // console.log(`Pixabay image is ${picture.pixabayImage}.`);
    const allData = await updateUI('http://localhost:3030/all');
  };
  
  // travelCard.addEventListener('click', handleSubmit);

  // if(travelCard != null){
  //   travelCard.addEventListener('click', handleSubmit);
  // };
  
  // travelCard.style.display = 'none';
  
  export {
    //main function from client.js
    handleSubmit
  }
  