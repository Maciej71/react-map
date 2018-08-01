import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MapContainer from './MapContainer';
import List from './List'

const places = require("./places.json")

export default class App extends Component {
  /*global state*/
  state = {
    places: [],
    data: {},
    displayedPlaces: []
  }

  componentDidMount() {
    // fetch('https://api.foursquare.com/v2/venues/5831fe30fb549a1ff58ef339?&client_id=AKV0SHDQ3PR5RZNARHKXH32YTZ1OIFPC1Y3PAY3CTBVKO1V&client_secret=UXY4PPJH0B35AEREN5XE4KACPE5QUN4MM0B5AUMLQX1AABVK&v=20180722')
    //   .then(console.log(response => response.json()));
    this.setState({displayedPlaces: places})
  }

  //Update places which should be marked on the map
  updatePlaces = (placesToUpdate) => {
    this.setState({ displayedPlaces: placesToUpdate })
  }

  render() {
    return (
      <div className="App">
        <div className="outer-container">
          <div className="list">
            <List
              places={places}
              onUpdate={this.updatePlaces}
            />
          </div>
          <div className="map">
             <MapContainer places={ this.state.displayedPlaces}/>
          </div>
        </div>
      </div>
    );
  }
}
