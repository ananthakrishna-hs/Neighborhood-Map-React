import React, { Component } from 'react';
import MyMapComponent from './MyMapComponent';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import './App.css';

/*add this to your html -> <script src="https://storage.googleapis.com/code-snippets/rapidapi.min.js"></script> */
/*var rapid = new RapidAPI("zomato_5be69e9de4b02e44154002a3", "a0f185ef-ce63-4f5d-8bca-e34a007ff9d9");

rapid.call('Zomato', 'getLocationDetailsByCoordinates', { 
	'coordinates': '51.479392346072686, -0.07777785508063184',
	'apiKey': '11d486abefb1e5af48fc360ba4726227'

}).on('success', function (payload) {
	 /*YOUR CODE GOES HERE*/ 
//}).on('error', function (payload) {
	 /*YOUR CODE GOES HERE*/ 
//});*/




class App extends Component {
  state = {
    center: {lat: 12.931349, lng: 77.565320},
    venues: [],
    query: ''
  }
  
  componentDidMount() {
    this.fetchFunc(this.state.center);
    
  }

  fetchFunc = (center) => {
    fetch(`https://api.foursquare.com/v2/venues/search?ll=${center.lat},${center.lng}&client_id=LHKFCLEU3JQ4UVBH4OQZC4GBIKGBB4ADLP4C4W0TWEO4XUL2&client_secret=JO20NQCPDMURMQFJ0BCUVR5OGMY0NKPJCZHPIYDMZOIGKPHU&v=20181113`)
    .then(res => res.json()).then(function(response) {
      this.setState({venues: response.response.venues.slice(0, 10)});
    }.bind(this));
  }

  updateMarkers = (center) => {
    const obj = {lat: center.lat(), lng: center.lng()};
    this.setState({center: obj});
    this.fetchFunc(obj);
  }
  /*componentDidMount() {
    console.log("hi")
    this.setState({latlng: this.state.newCentre});
  }*/
  querying = (value) => {
    this.setState({query: value.trim()});
  }
  render() {
    let queriedVenues;
    if(this.state.query) {
      const matchedExp = new RegExp(escapeRegExp(this.state.query), 'i');
      queriedVenues = this.state.venues.filter(element => matchedExp.test(element.name));
    }
    else
      queriedVenues = this.state.venues;
    
    queriedVenues.sort(sortBy('location.distance'));
    
    return (
      <main className="conatiner">
        <div className="row">
          <div id="filter-container" className="col-sm-4 card bg-info">
            <div className="card-body">
              <input type="text" className="filter-text" placeholder="Filter Locations" onChange={e => this.querying(e.target.value)} />
              <ul className="list-items">
                {
                  queriedVenues.map(element => (
                    <li key={element.id} className="list-item">{element.name}</li>
                  ))
                }
              </ul>
            </div>
          </div>
          <div id="map-container" className="col-sm-8">
            <MyMapComponent
            markers_loc={queriedVenues}
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDT23otK1Zca1ko0AT1Yu1ntojCMHTVzfY"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            center={this.state.center}
            triggerUpdate={this.updateMarkers}
            />
          </div>
        </div>
      </main>
    )
  }
}


export default App;
