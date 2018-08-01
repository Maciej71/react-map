import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';

export default class List extends Component {
	static propTypes = {
		places: PropTypes.array.isRequired,
		selected: PropTypes.array.isRequired,
		onUpdate: PropTypes.func.isRequired,
		selectPlace: PropTypes.func.isRequired,
		deselectPlace: PropTypes.func.isRequired
	}

	state = {
	query: '',
	// isSelected: false
	}

	/*
	To avoid infinite loop because of nested state manipulation this function has to be
	executed twice. First time to adjust list of places. Second time to pass information about markers
	which should be diplayed.
	*/
	filterPlaces = (query) => {
		query = (typeof query !== 'undefined') ? query: this.state.query;
		let displayPlaces
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			return displayPlaces = this.props.places.filter((place) => match.test(place.name))
		} else {
			return displayPlaces = this.props.places
		}
	}

	//Pass list of places used to display markers
	passMarkersList = (query) => {
		this.props.onUpdate(this.filterPlaces(query))
	}

	updateQuery = (query) => {
	  this.setState({ query: query })
	}

	selectOrDeselect = (placeId) => {
		console.log(this.props.selected.includes(placeId) ? 'de': 'se');
		console.log(placeId)
		this.props.selected.includes(placeId) ? this.props.deselectPlace(placeId) : this.props.selectPlace(placeId);
	}

	adjustClass = (bool) => {
		return !bool
	}

	render() {
    const { query } = this.state

		let displayPlaces = this.filterPlaces()

		return (
			<div>
				<div className="filter">
					<input
						className='search-places'
						type='text'
						placeholder='Search places'
						value={query}
						onChange={(event) => {
							this.updateQuery(event.target.value);
							this.passMarkersList(event.target.value)
						}}
					/>
				</div>
			  <ul className="places-grid" role="list">
					{displayPlaces.map((place) => {
						return(
							<li 
							  className="list-item" 
							  key={place.id} 
							  tabIndex="1" 
							  role="listitem"
							  onClick={() => {
								this.selectOrDeselect(place.id)
								this.adjustClass()
							  }}
							>{place.name}</li>
						)
					})}
			  </ul>
      </div>
		);
	}
}
