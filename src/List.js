import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import ListRow from './ListRow'

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
		if (query) {
			const match = new RegExp(escapeRegExp(query), 'i')
			return this.props.places.filter((place) => match.test(place.name))
		} else {
			return this.props.places
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
		this.props.selected.includes(placeId) ? this.props.deselectPlace(placeId) : this.props.selectPlace(placeId);
	}

	render() {
	const { query } = this.state
	const { selected } = this.props

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
			  <ul className="places-grid">
					{displayPlaces.map((place) => {
						let active = selected.includes(place.id) ? true : false
						return(
							<ListRow
							  key={place.id}
							  place={ place }
							  selection= { this.selectOrDeselect }
							  active= { active }
							/>
						)
					})}
			  </ul>
      </div>
		);
	}
}
