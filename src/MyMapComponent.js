import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class MyMapComponent extends Component {
  
  render() {
    //Get the venue which is hovered and set its animation to BOUNCE
    let venues = this.props.markers_loc.map(venue => {
      if(venue.id === this.props.hover)
        venue.animate=window.google.maps.Animation.BOUNCE;
      else
        venue.animate=window.google.maps.Animation.DROP;
      return venue;
    });
    return (
      <GoogleMap 
      defaultZoom={15} 
      defaultCenter={this.props.center} 
      ref="map" 
      onCenterChanged={event => this.props.triggerUpdate(this.refs.map.getCenter())}
      >
      {
        venues.map(venue => (
          <Marker
          position={{lat: venue.location.lat, lng: venue.location.lng}}
          onClick={event => this.props.triggerClick(this.props.venueObj.id)}
          animation={venue.animate}
          />
        ))
      }
      </GoogleMap>
    )
  }
}

export default withScriptjs(withGoogleMap(MyMapComponent));