import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListRow extends Component {
	static propTypes = {
		place: PropTypes.object.isRequired,
		selection: PropTypes.func.isRequired
	}

	state = {
	  active: false
    }

    toggleClass() {
        this.setState((prevState) => {
            return { active: !prevState.active }
          })
    };

    componentDidUpdate() {
        if(this.props.active !== this.state.active) {
            this.toggleClass()
        }
    }

    render() {
        const { place, selection } = this.props
        const { active } = this.state
        return(
          <li
            className={ active ? "selected-row": null } 
            tabIndex="0"
            onClick={() => {
            selection(place.id)
            this.toggleClass()
            }}
          >{place.name}</li>
        )
    }
}
