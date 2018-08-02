import React, { Component } from 'react'
import { Marker } from "react-google-maps"
import Dinner from "./icons/dinner.svg"
import Beer from "./icons/beer-glass.svg"
import { InfoWindow } from "react-google-maps"
import PropTypes from 'prop-types'

export default class PlaceMarker extends Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired
    //reszta propsow
	}

  toggleWindow = () => {
    this.props.selected ? this.props.deselectPlace(this.props.id) : this.props.selectPlace(this.props.id)
  }

  render(){
    const { location, icon,  selected} = this.props
    return(
        /*global google*/
        //Define marker settings
        <Marker
          position={location}
          icon={icon === "Dinner" ? Dinner: Beer}
          animation={ selected ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
          onClick={this.toggleWindow}
        >
        {selected &&
          <InfoWindow onCloseClick={this.toggleWindow}>
            <h2>{selected ? 'YES' : "NO"}</h2>
         </InfoWindow>
        }
        </Marker>
    );
  }
}
