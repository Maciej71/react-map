import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Hamburger from './Hamburger';
import MapContainer from './MapContainer';

const places = require("./places.json")

export default class App extends Component {
  /*global state*/
  state = {
    places: []
  }
  componentDidMount() {
    // ContactsAPI.getAll().then((contacts) => {
    //   this.setState({ contacts })
    // })
  }

  render() {
    return (
      <div className="App">
        <div id="outer-container">
          <Hamburger places={places}/>
          <main id="page-wrap"
          role="application"
          aria-label="Interesting places in Krakow City Center"
          >
           <MapContainer places={places}/>
          </main>
        </div>
      </div>
    );
  }
}
