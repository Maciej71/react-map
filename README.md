# **MODEST MAP**


## Installation

 - Clone or download the app
 - Type in console: npm install
 - To run the app in developer mode type in console" npm start. Go to a browser and visit http://localhost:3000
 In developer mode **Service Worker is not registered**  for debugging purpose
 - To run production version which includes registered service worker type in console: npm run build. Than deploy generated app in one of the ways describing [here](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment)

## Features
The app uses [Google Maps](https://cloud.google.com/maps-platform/) API to present a map with few marked places which can be filter by name using input field. After clicking the marker or list row with place name info window appears above chosen marker. In the window rating provided by [Foursquare](https://developer.foursquare.com/) API is presented. 