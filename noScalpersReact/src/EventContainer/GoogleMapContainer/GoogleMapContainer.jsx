
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
    
    onMarkerClick = (searchResult, marker, e) => {
        this.setState({
        selectedPlace: searchResult,
        activeMarker: marker,
        showingInfoWindow: true
      });

      console.log(this.state.selectedPlace, 'this is the selected place')
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
      return (<Marker key={i} title={searchResult.displayName} 
        position={{lat: searchResult.location.lat,
            lng: searchResult.location.lng
        }}
       />)
    });

    return (
      <Map
        google={this.props.google}
        style={mapStyles}
        defaultZoom={14}
        center={{
          lat: this.props.lat,
          lng: this.props.lng
        }}
     >
     <Marker
          onClick={this.onMarkerClick}

        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
          </div>
        </InfoWindow>
       {allSearchResults}
      </Map>
    );
  }

}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyB3cnf0QZnOYfHCu1eElopL5grod6fyePU'
})(MapContainer);