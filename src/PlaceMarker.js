import React, { Component } from 'react';
import { Marker } from "react-google-maps";
import Dinner from "./icons/dinner.svg";
import Beer from "./icons/beer-glass.svg";

export default class PlaceMarker extends Component {

  render(){
    return(
        /*global google*/
        <Marker
          position={this.props.location}
          icon={this.props.icon === "Dinner" ? Dinner: Beer}
          defaultAnimation={google.maps.Animation.DROP}
        >
        </Marker>
    );
  }
}