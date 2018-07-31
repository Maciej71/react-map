import React, { Component } from 'react';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';

export default class List extends Component {
	static propTypes = {
		places: PropTypes.array.isRequired
	}

	state = {
    query: ''
  }

	updateQuery = (query) => {
	  this.setState({ query: query })
  }

	render() {
		const { places } = this.props
    const { query } = this.state

	let displayPlaces
	if (query) {
		const match = new RegExp(escapeRegExp(query), 'i')
    displayPlaces = places.filter((place) => match.test(place.name))
	} else {
		displayPlaces = places
	}

		return (
			<div>
				<div className="filter">
					<input
						className='search-places'
						type='text'
						placeholder='Search places'
						value={query}
						onChange={(event) => this.updateQuery(event.target.value)}
					/>
				</div>
			  <ul className="places-grid" role="list">
					{displayPlaces.map((place) => {
						return(
							<li className="list-item" key={place.id} tabIndex="1" role="listitem">{place.name}</li>
						)
					})}
			  </ul>
      </div>
		);
	}
}
