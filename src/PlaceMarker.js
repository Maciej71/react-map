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

  // state = {
  //   isOpen: false
  // }
  
  componentWillReceiveProps() {
    // this.setState({ isOpen: this.props.selected})
  }

  toggleWindow = () => {
    this.props.selected ? this.props.deselectPlace(this.props.id) : this.props.selectPlace(this.props.id)
  }

  render(){
    // const { isOpen } = this.state
    const { location, icon,  selected} = this.props
    // console.log(isOpen + ' ' + this.props.selected + ' ' + this.props.id)
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
