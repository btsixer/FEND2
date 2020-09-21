# FEND2

New FEND-Capstone repository to learn how to re-build from the beginning

README.md Travel Planner This project will allow you to get information on your next trip based on date and location.

Getting Started To start please clone this directory to your computer. From inside the directory, install the depedencies with "npm i". You may then build the project with "npm run build-prod" and start the server with "npm start". You can find the project on your browser at http://localhost:3030/.

This project uses express server for the production build and webpack dev server for the developement build.

Features -Displays length of trip, weather, latitude, logitude, how many days away the trip is, high temp and low temp -Displays an image of the country as well as an image from Pixabay API when the entered location brings up no results.

Dependencies babel, babel loader, css loader, file loader, html loader, html webpack plugin, node sass, sass loader, style loader, webpack, webpack cli, and webpack dev server

Usage There is no error handling for date mismatches like selecting a date in the past or the start / finish dates being out of order. The expectation is that the user will select the dates in the proper order and in the future. The user should also select a start date within 16 days of today or the application will not run appropriately. For the purposes of this Capstone, all testing should be within the 16 day interval in the future. Additionally, entries on the form are limited to United States cities and states. For the purposes of the assignment, I decided to limit user input and error controls to the US.
