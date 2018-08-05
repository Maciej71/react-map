import React, { Component } from 'react'
import { Marker } from "react-google-maps"
import Dinner from "./icons/dinner.svg"
import Beer from "./icons/beer-glass.svg"
import { InfoWindow } from "react-google-maps"
import PropTypes from 'prop-types'

export default class PlaceMarker extends Component {
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    selectPlace: PropTypes.func.isRequired,
    deselectPlace: PropTypes.func.isRequired
	}

  toggleWindow = () => {
    this.props.selected ? this.props.deselectPlace(this.props.id) : this.props.selectPlace(this.props.id)
  }

  render(){
    const { location, icon,  selected, rating } = this.props
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
          <div className="ratig">
            <div>Rate: {rating}</div>
          </div>
         </InfoWindow>
        }
        </Marker>
    );
  }
}
