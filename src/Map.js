import React, { Component } from 'react';
import MyMapComponent from './MyMapComponent';

class Map extends Component {
  state = {
    locations: [],
    center: {}
  }
  componentWillMount() {
    let markers = this.props.restaurants.map(element => {
      let object = {
        lat: parseFloat(element.restaurant.location.latitude),
        lng: parseFloat(element.restaurant.location.longitude),
        id: element.restaurant.id
      };
      return object;
    });
    console.log(this.props)
    let x = 0, y = 0;
    for(let i = 0;i < markers.length;i++) {
      x = x + markers[i].lat;
      y = y + markers[i].lng;
    }
    x = x / markers.length;
    y = y / markers.length;
    
    let xy = {lat: x, lng: y};
    this.setState({
      locations: markers,
      center: xy
    });
  }
  render() {
    return (
      <MyMapComponent
      markers_loc={this.state.locations}
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDT23otK1Zca1ko0AT1Yu1ntojCMHTVzfY"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      center={this.state.center}
      />
    )
  }
}

export default Map