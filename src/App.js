import React, { Component } from 'react'
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

  //Fetch data for rating
  async componentDidMount() {
    await Promise.all(
      places.map(
        async (place) => await (await (fetch('https://api.foursquare.com/v2/venues/'+place.id+'?&client_id=EAKV0SHDQ3PR5RZNARHKXH32YTZ1OIFPC1Y3PAY3CTBVKO1V&client_secret=UXY4PPJH0B35AEREN5XE4KACPE5QUN4MM0B5AUMLQX1AABVK&v=20190722')
      )
      .then((response) => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response
      }
    )
      .then(res => { return res.json() })
      .then(data => {
        return { "rating" : data.response.venue.rating, "id" : place.id }
      })
      .catch(err => {
        console.log(err)
        return { "rating" : "?", "id" : place.id }
        })
      )
    )
  ).then((data) => this.setState({ foursquare: data }))
  
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
      <div className="App" role="application">
        <div className="outer-container">
          <main className="list">
            <List
              places={ places }
              onUpdate={ this.updatePlaces }
              selectPlace={ this.selectPlace }
              deselectPlace={ this.deselectPlace }
              selected={ selectedFromList }
            />
          </main>
          <div className="map">
            <MapContainer
              places={ displayedPlaces}
              selected={ selectedFromList }
              foursquareVenues={ foursquare }
              selectPlace={ this.selectPlace }
              deselectPlace={ this.deselectPlace }
            />
          </div>
        </div>
      </div>
    );
  }
}
