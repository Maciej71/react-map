import PlacesMap from "./PlacesMap"
import React, { Component } from 'react'
import PropTypes from 'prop-types'

//Container for map
export default class MapContainer extends Component {
	static propTypes = {
		places: PropTypes.array.isRequired,
		selected: PropTypes.array.isRequired,
		selectPlace: PropTypes.func.isRequired,
		deselectPlace: PropTypes.func.isRequired,
		foursquareVenues: PropTypes.array.isRequired
	}

	render() {
		const { places, selected, selectPlace, deselectPlace, foursquareVenues } = this.props
		return (
			<PlacesMap
			  title="Google Maps"
			  places={ places }
			  selected={ selected }
			  selectPlace={ selectPlace }
        deselectPlace={ deselectPlace }
				foursquare= { foursquareVenues }
			  googleMapURL={ 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAQi-OSjGUi2LNB_6InQaFqDeFNELwlwv0&v=3.exp&libraries=geometry,drawing,places' }
			  loadingElement={<div style={{ height: `100%` }} />}
			  containerElement={<div style={{ height: `100vh`}} />}
			  mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}
