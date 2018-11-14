import React, { Component } from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

class Markers extends Component {
  state = {
    infoOpen: false
  }

  toggleWindow = () => {
    if(this.state.infoOpen)
      this.setState({infoOpen: false});
    else  
      this.setState({infoOpen: true});
  }
  render() {
      return (
        <Marker 
        position={{lat: this.props.venueObj.location.lat, lng: this.props.venueObj.location.lng}}
        onClick={event => this.props.triggerClick(this.props.venueObj.id)}
        tabIndex="0"
        aria-label="Marker"
        animation={this.props.venueObj.animate}
        >
          {this.state.infoOpen && (
            <InfoWindow
            onCloseClick={event => this.toggleWindow()}
            >
              <h3>Hi</h3>
            </InfoWindow>
          )}
        </Marker>
      )
  }
}

export default Markers