import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyMapComponent from './MyMapComponent';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { Grid, Row, Col, Jumbotron, Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Label, 
  Panel, Button, Navbar } from 'react-bootstrap';
import './App.css';

class App extends Component {
  state = {
    //Stores a default center and empty values to be fetched later
    center: {lat: 12.931349, lng: 77.565320},
    venues: [],
    query: '',
    modalShown: false,
    modalVenue: {},
    modalDetail: {},
    hover: '',
    errorComponent: false
  }
  
  componentDidMount() {
    this.fetchFunc(this.state.center);
  }

  //Re-usable function to get nearby venues at start as well as at center change
  fetchFunc = (center) => {
    let client_id = '<CLIENT_ID>', client_secret = '<CLIENT_SECRET>', v = '<YYYYMMDD>';
    fetch(`https://api.foursquare.com/v2/venues/search?ll=${center.lat},${center.lng}&client_id=${client_id}&client_secret=${client_secret}&v=${v}`)
    .then(res => res.json()).then(function(response) {
      if(response.meta.code === 200)
        this.setState({venues: response.response.venues.slice(0, 10)});
      else
        this.setState({errorComponent: true});
    }.bind(this)).catch(function(err) {
      this.setState({errorComponent: true});
    }.bind(this));
  }

  updateMarkers = (center) => {
    const obj = {lat: center.lat(), lng: center.lng()};
    this.setState({center: obj});
    this.fetchFunc(obj);
  }
  
  querying = (value) => {
    this.setState({query: value.trim()});
  }

  closeModal = () => {
    this.setState({modalShown: false});
  }

  //Get details of clicked venue from list/marker 
  toggleModal = (venueId) => {
    if(this.state.modalShown) 
      this.setState({
        modalShown: false,
      });
    else {
      let client_id = '<CLIENT_ID>', client_secret = '<CLIENT_SECRET>', v = '<YYYYMMDD>';
      fetch(`https://api.foursquare.com/v2/venues/${venueId}?client_id=${client_id}&client_secret=${client_secret}&v=${v}`)
      .then(res => res.json()).then(function(response) {
        if(response.meta.code === 200)
          this.setState({
            modalShown: true,
            modalVenue: venueId,
            modalDetail: response.response
          });
        else
          this.setState({errorComponent: true});
      }.bind(this)).catch(function(err) {
        this.setState({errorComponent: true});
      }.bind(this));
    }
  }

  //closeFocus and titleFocus are functions to trap focus inside the modal 
  closeFocus = (event) => {
    if(event.keyCode === 9)
      if(!event.shiftKey) {
        event.preventDefault();
        ReactDOM.findDOMNode(this.modalTitle).focus();
      }  
  }

  titleFocus = (event) => {
    if(event.keyCode === 9)
      if(event.shiftKey) {
        event.preventDefault();
        ReactDOM.findDOMNode(this.closeButton).focus();
      }
  }

  //hoverStart and hoverStop are functions to make hovered list item's marker animate 
  hoverStart = (venueId) => {
    this.setState({hover: venueId});
  }

  hoverStop = () => {
    this.setState({hover: ''});
  }

  componentDidCatch(error, info) {
    this.setState({errorComponent: true});
  }

  render() {
    //Display the query-matched contents only
    let queriedVenues;
    if(this.state.query) {
      const matchedExp = new RegExp(escapeRegExp(this.state.query), 'i');
      queriedVenues = this.state.venues.filter(element => matchedExp.test(element.name));
    }
    else
      queriedVenues = this.state.venues;
    
    queriedVenues.sort(sortBy('location.distance'));
    
    return (
      <div>
        {this.state.errorComponent && (
          <header tabIndex="0">
            <Jumbotron>
              <h1 tabIndex="0">
                Sameepa
              </h1>
              <p tabIndex="0">
                One-stop destination to find nearby places.
              </p>
                <h3 tabIndex="0" aria-live="assertive">
                  <Label bsStyle="danger">
                    Some or no content could be loaded.<br /> Please try again later
                  </Label>
                </h3>
            </Jumbotron>
          </header>
        )}
        {!this.state.errorComponent && (
          <div>
            {this.state.modalDetail.venue && 
            (
              <Modal 
              show={this.state.modalShown}
              onHide={this.closeModal}
              autoFocus={true}
              aria-label="Modal Window"
              onEnter={event => this.hoverStart(this.state.modalDetail.venue.id)}
              onExit={event => this.hoverStop()}
              >
                <ModalHeader>
                  <ModalTitle 
                  tabIndex="0" 
                  ref={(title) => { this.modalTitle = title; }}
                  onKeyDown={e => this.titleFocus(e)}
                  >
                    {this.state.modalDetail.venue.name}
                  </ModalTitle>
                </ModalHeader>
                <ModalBody tabIndex="0" aria-label="Venue Details">
                  <div tabIndex="0">Categories:</div>
                  {this.state.modalDetail.venue.categories.length && (
                    <div>
                      <Panel tabIndex="0">
                        {this.state.modalDetail.venue.categories.map(category => category.name)}
                      </Panel>
                      <br />
                    </div>
                  )}
                  <br />
                  <Label bsStyle="default" className="modal-label-left" tabIndex="0">Location: {this.state.modalDetail.venue.location.country}</Label>
                  <Label bsStyle="info" className="modal-label-right" tabIndex="0">Timezone: {this.state.modalDetail.venue.timeZone}</Label>
                </ModalBody>
                <ModalFooter>
                  <div tabIndex="0" aria-label="Data attribution">
                    <p tabIndex="0">Data by FOURSQUARE API</p>
                    <Button 
                    bsStyle="success" 
                    href={this.state.modalDetail.venue.shortUrl} 
                    target="_blank"
                    className="modal-label-left"
                    >
                      FOURSQUARE link of the Venue
                    </Button>
                  </div>
                  <Button 
                  bsStyle="danger" 
                  onClick={this.closeModal} 
                  ref={(close) => { this.closeButton = close; }}
                  tabIndex="0"
                  onKeyDown={e => this.closeFocus(e)}
                  className="modal-label-right"
                  aria-label="Modal Close"
                  >
                    Close
                  </Button>
                  
                </ModalFooter>
              </Modal>
            )
            }
            <header tabIndex="0">
              <Jumbotron>
                <h1 tabIndex="0">
                  Sameepa
                </h1>
                <p tabIndex="0">
                  One-stop destination to find nearby places.
                </p>
              </Jumbotron>
            </header>
            <main>
              <Grid>
                <Row className="main-container">
                  <Col sm={4} className="list-container" tabIndex="0" aria-label="Filter list">
                    <Navbar>
                      <Navbar.Header>
                        <Navbar.Toggle />
                      </Navbar.Header>
                      <Navbar.Collapse>
                        <label htmlFor="search">Filter Locations:</label>
                        <input type="text" id="search" className="filter-text" onChange={e => this.querying(e.target.value)} />
                        <ul className="list-items">
                          {
                            queriedVenues.map(element => (
                              <li 
                              key={element.id} 
                              className="list-item"
                              onClick={event => this.toggleModal(element.id)}
                              onMouseOver={event => this.hoverStart(element.id)}
                              onMouseOut={event => this.hoverStop()}
                              tabIndex="0"
                              role="button"
                              >
                                {element.name}
                              </li>
                            ))
                          }
                        </ul>
                      </Navbar.Collapse>
                    </Navbar>
                  </Col>
                  <Col sm={8} className="map-container" tabIndex="0" aria-label="Map application">
                    <MyMapComponent
                    markers_loc={queriedVenues}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=<YOUR_GOOGLE_MAPS_API_KEY>"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    center={this.state.center}
                    triggerUpdate={this.updateMarkers}
                    triggerClick={this.toggleModal}
                    hover={this.state.hover}
                    />
                  </Col>
                </Row>
              </Grid>
            </main>
          </div>
        )}
      </div>
    )
  }
}


export default App;
