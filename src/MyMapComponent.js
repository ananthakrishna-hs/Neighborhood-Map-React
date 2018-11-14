import React, { Component } from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

/*const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 12.931304, lng: 77.565318 }}
    
  >
    {props.isMarkerShown && <Marker position={{ lat: 12.931297, lng: 77.563887 }} animation={window.google.maps.Animation.BOUNCE} opacity = {0.5} icon ={'http://www.spacecom-lenses.com/wp-content/social-icons/rss-white.png'}/>}
    {}
  </GoogleMap>
));*/
class MyMapComponent extends Component {
  //componentDidMount() {
    //let bounds = this.refs.map.getBounds();
    //console.log(this.refs)
    /*for(let i = 0;i < this.props.markers_loc.length;i++)
      bounds.extend({lat: this.props.markers_loc[i].lat, lng: this.props.markers_loc[i].lng});
    this.refs.map.fitBounds(bounds);*/

  //}
  
  componentWillMount() {
    
    /*let bounds = new window.google.maps.LatLngBounds();
    
    for(let i = 0;i < this.props.markers_loc.length;i++)
      bounds.extend({lat: this.props.markers_loc[i].lat, lng: this.props.markers_loc[i].lng});
    console.log(bounds)
    this.mapLoaded.current.fitBounds(bounds);*/
    /*console.log(this.mapLoaded.current)
    let bounds = this.mapLoaded.current.getBounds();
    console.log(this.mapLoaded.current.getBounds())
    console.log(bounds);
    for(let i = 0;i < this.props.markers_loc.length;i++)
      bounds.extend({lat: this.props.markers_loc[i].lat, lng: this.props.markers_loc[i].lng});
    this.mapLoaded.current.fitBounds(bounds);
    */
    //console.log(bounds);
  }
  fit = function() {
    console.log("hi")
    if(this.props.newCenter.hasOwnProperty('lat') && this.props.newCenter.hasOwnProperty('lng'))
      this.refs.map.panTo({lat: this.props.newCenter.lat, lng: this.props.newCenter.lng});
    
      
  }
  
  getCenter = function() {
    let latlng = this.refs.map.getCenter();
    let lat = latlng.lat();
    let lng = latlng.lng();
    console.log(lat+"*"+lng);
  }
    render() {
        return (
          <GoogleMap 
          defaultZoom={15} 
          defaultCenter={this.props.center} 
          ref="map" 
          onCenterChanged={event => this.props.triggerUpdate(this.refs.map.getCenter())}
          //onTilesLoaded={(e) => this.fit()}
          >
            {
              this.props.markers_loc.map(venue => (
                <Marker key={venue.id} position={{lat: venue.location.lat, lng: venue.location.lng}} />
              ))
            }
          </GoogleMap>
        )
    }
}

export default withScriptjs(withGoogleMap(MyMapComponent))