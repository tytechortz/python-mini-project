import React, {Component} from 'react';
import EventList from './EventList/EventList';
import SearchTerm from './SearchTerm/SearchTerm';
import SearchResults from './SearchResults/SearchResults';
import MapContainer from './GoogleMapContainer/GoogleMapContainer'


class EventContainer extends Component {
    constructor(){
        super();
        this.state = {
            events: [],
            searchResults: [],
            lat: 39.7392,
            lng: 104.9903
              
        }
    }

    getEvents = async () => {
        try {
            const events = await fetch('https://api.songkick.com/api/3.0/metro_areas/24580/calendar.json?apikey=STzlRsvfup7hHr4s')
           
            const eventsJSON = await events.json();
            // console.log(eventsJSON.resultsPage)
            return eventsJSON

        } catch (err) {
            return err
        }
    }

    componentDidMount () {
        this.getEvents().then((events) => {
            // console.log(events.resultsPage)
          this.setState({events: events.resultsPage.results.event});
        //   console.log('hey')
        }).catch((err) => { 
          console.log(err)
        })
      }
      
      performSearch = async (searchTerm, e) => {
            e.preventDefault();
            try {
                const initialSearchResults = await fetch('https://api.songkick.com/api/3.0/search/locations.json?query='+ searchTerm +' &apikey=STzlRsvfup7hHr4s');
                const initialSearchResultsJSON = await initialSearchResults.json();
                const firstLocation = initialSearchResultsJSON.resultsPage.results.location[0].metroArea.id
                const searchResults = await fetch ('https://api.songkick.com/api/3.0/metro_areas/'+ firstLocation + '/calendar.json?apikey=STzlRsvfup7hHr4s')
                const searchResultsJSON = await searchResults.json();
                // return searchResultsJSON
                this.setState({
                    searchResults: searchResultsJSON.resultsPage.results.event,
                    lat: searchResultsJSON.resultsPage.results.event[0].location.lat,
                    lng: searchResultsJSON.resultsPage.results.event[0].location.lng
                    
                   
                })

                console.log(this.state, '<--- currentState')
    
            } catch (err) {
                return err
            }
      }

    
      
     
      


    render() {
        return(
            <div>
                <SearchTerm performSearch={this.performSearch}/>
                <SearchResults searchResults={this.state.searchResults} />
                <MapContainer searchResults={this.state.searchResults} lat={this.state.lat} lng={this.state.lng}/>
                {/* <EventList events= {this.state.events}/>  */}
            </div>
        )
    }
}

export default EventContainer;

