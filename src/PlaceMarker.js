import React, { Component } from 'react';
import { Marker } from "react-google-maps";
import Dinner from "./icons/dinner.svg";
import Beer from "./icons/beer-glass.svg";

export default class DoctorMarker extends Component {

  render(){
      console.log(this.props.location)
    return(
        <Marker
          position={this.props.location}
          icon={this.props.icon === "Dinner" ? Dinner: Beer}
        >
        </Marker>
    );
  }
}