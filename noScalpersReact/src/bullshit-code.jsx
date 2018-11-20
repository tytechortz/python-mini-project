
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {
    constructor() {
        super();
        this.state = {
        showingInfoWindow: false,  
        activeMarker: {},         
        selectedPlace: {},
        
           
      };
    }
    
    onMarkerClick = (props, marker, e) => {
        this.setState({
              selectedPlace: searchResult,
              activeMarker: marker,
              showingInfoWindow: true
            });
      console.log(this.state.selectedPlace, 'this is selected place')
    }
    

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  render() {

    const allSearchResults = this.props.searchResults.map((searchResult, i) =>{
      console.log(searchResult);
      return (<Marker key={i} name={searchResult.displayName} 
        position={{lat: searchResult.location.lat,
            lng: searchResult.location.lng
        }} >
        
                <InfoWindow>
                <div>
                </div>
            </InfoWindow>
        </Marker>
       
       
      )
    });

    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        
     >
       {allSearchResults}

        <Marker
          onClick={this.onMarkerClick}

        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }

}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyB3cnf0QZnOYfHCu1eElopL5grod6fyePU'
})(MapContainer);




onMarkerClick = (props, marker, e) =>
this.setState({
  selectedPlace: props,
  activeMarker: marker,
  showingInfoWindow: true
});

onClose = props => {
if (this.state.showingInfoWindow) {
  this.setState({
    showingInfoWindow: false,
    activeMarker: null
  });
}
};