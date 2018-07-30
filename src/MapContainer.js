// import React from "react";
import PlacesMap from "./PlacesMap";
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MapContainer extends Component {
	static propTypes = {
		places: PropTypes.array.isRequired
	}
	render() {
		return ( 
			<PlacesMap
			    places={this.props.places}
				googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyA4pkKsxPzKzIsKZRqY0BKzhldvfVqxRU4&v=3.exp&libraries=geometry,drawing,places`}
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `100vh`}} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}
