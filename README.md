# Neighborhood Map React - Sameepa

> Uses ReactJS library for users to get top nearby venues of a location.

## Overview

This project makes use of ReactJS v16, Google Maps API and FOURSQUARE API to get venues and locations.

Users can perform dynamic filtering with respect to venue's name to get venues as well as its corresponding map markers.

Features of the app: 
- Responsive.
- Ease of use.
- Accessible
- Dynamic filtering.
- Offline support(subject to CRA-PWA specifications learn more in: [Documentation](http://bit.ly/CRA-PWA))

## Technologies used
- HTML5
- CSS3
- JavaScript
- ReactJS and some helper npm libraries:
    - react-dom
    - react-google-maps
    - react-bootstrap
    - escape-string-regexp
    - sort-by
-
## Setup

### Requirements
- node greater than v6
- npm greater than v5
- ReactJS v16

### Installation/Development
- Download/clone the repository.
- Download the node package manager as per requirements and run `npm install` in terminal.
- Install the react-app using command `npm install create-react-app`
- Install the dependencies:
    - `npm install --save <libraries>`
- In terminal change directory to the downloaded folder and run `npm start`. The web-app will run at the url `localhost:3000`.

## About Google Maps API and react-google-maps

Google Maps API is a library for developers/organisations to use Google Maps. Its API key can be obtained from its [developers website](https://cloud.google.com/maps-platform/).
'react-google-maps' is just a wrapper to most of the google maps library functionalities. All of the wrappers are through React components and props. Refer the [documentation](https://tomchentw.github.io/react-google-maps/).

## About react-bootstrap

'react-bootstrap' is a wrapper library for most of the functionalities of the CSS framework Bootstrap 3. All the supported functionalities are through React components and props.

## About FOURSQUARE API

This API library gets nearby venues to a particular location as well as its various details.
Two of its APIs are used in this web-app: 
- venues/search: This responds with a JSON of 30 venues nearby a particular location provided as parameters.
- venues/details: This responds with JSON of details of a venue of a particular venueID provided as parameters.

Both APIs require authentication through their [developer platform](https://developer.foursquare.com/).

##About escape-string-regexp and sort-by

These libraries are combined with JavaScript methods in order to facilitate matching and sorting.


> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


