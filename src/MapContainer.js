import PlacesMap from "./PlacesMap"
import React, { Component } from 'react'
import PropTypes from 'prop-types'

//Container for map
export default class MapContainer extends Component {
	static propTypes = {
		places: PropTypes.array.isRequired,
		selected: PropTypes.array.isRequired
		//reszta propsow
	}
	render() {
		const { places, selected, selectPlace, deselectPlace } = this.props
		return (
			<PlacesMap
			  places={ places }
			  selected={ selected }
			  selectPlace={ selectPlace }
        deselectPlace={ deselectPlace }
			  googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA4pkKsxPzKzIsKZRqY0BKzhldvfVqxRU4&v=3.exp&libraries=geometry,drawing,places`}
			  loadingElement={<div style={{ height: `100%` }} />}
			  containerElement={<div style={{ height: `100vh`}} />}
			  mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}
