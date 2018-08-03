import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css'
import MapContainer from './MapContainer'
import List from './List'

const places = require("./places.json")

export default class App extends Component {
  state = {
    places: [],
    foursquare: [],
    displayedPlaces: [],
    selectedFromList: []
  }

  //handle api response errors
  handleErrors = (response) => {
    if(!response.ok) {
      throw Error(response.statusText);
    }
    return response
  }

  //handle lack of rating in case of api error
  foursquareInaccessible = (placeId) => {
    this.setState(prevState => ({
      foursquare: [ ...prevState.foursquare, { "rating" : "?", "id" : placeId }]
    }))
  }

  //handle data provided from API
  foursquareAaccessible = (placeId, res) => {
    this.setState(prevState => ({
      foursquare: [ ...prevState.foursquare, { "rating" : res.response.venue.rating, "id" : placeId }]
    }))
  }

 //Fetch data async
 fetchAPI = async (placeId, foursquareInaccessible, foursquareAaccessible) => {
    // await fetch('https://api.foursquare.com/v2/venues/'+placeId+'?&client_id=AKV0SHDQ3PR5RZNARHKXH32YTZ1OIFPC1Y3PAY3CTBVKO1V&client_secret=UXY4PPJH0B35AEREN5XE4KACPE5QUN4MM0B5AUMLQX1AABVK&v=20190722')
    await fetch('htps://api.foursquare.com/v2/venues/'+placeId+'?&oauth_token=aaa&v=20180803')
                          .then(this.handleErrors)
                          .then(response => response.json())
                          .then(response => {
                            foursquareAaccessible(placeId, response)
                          }).catch((error) => {
                            console.log(error)
                            foursquareInaccessible(placeId)
                          })

}

  //Fetch data when component is monuted
  async componentDidMount() {
   await places.forEach((place) => {
      this.fetchAPI(place.id, this.foursquareInaccessible, this.foursquareAaccessible)
    }
  )
  //set initil list of places
  this.setState({displayedPlaces: places})
  }

  //Update places which should be marked on the map
  updatePlaces = (placesToUpdate) => {
    this.setState({ displayedPlaces: placesToUpdate })
  }

  //Add new place to selected places list
  selectPlace = (placeId) => {
    this.setState(prevState => ({
      selectedFromList: [ ...prevState.selectedFromList, placeId]
    }))
  }

  //Remove a place from selected places list
  deselectPlace = (placeId) => {
    this.setState((prevState) => {
      return { selectedFromList: prevState.selectedFromList.filter(place => !placeId.includes(place)) }
    })
  }

  render() {
    const { displayedPlaces, selectedFromList, foursquare } = this.state
    return (
      <div className="App">
        <div className="outer-container">
          <div className="list">
            <List
              places={ places }
              onUpdate={ this.updatePlaces }
              selectPlace={ this.selectPlace }
              deselectPlace={ this.deselectPlace }
              selected={ selectedFromList }
            />
          </div>
          <div className="map">
            <MapContainer
              places={ displayedPlaces}
              selected={ selectedFromList }
              selectPlace={ this.selectPlace }
              deselectPlace={ this.deselectPlace }
              foursquareVenues={ foursquare }
            />
          </div>
        </div>
      </div>
    );
  }
}
