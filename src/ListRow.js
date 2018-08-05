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

    componentDidMount() {
        if(this.props.active !== this.state.active) {
            this.toggleClass()
        }
    }

    //Needed when list row should be updated because of marker click
    componentDidUpdate() {
        if(this.props.active !== this.state.active) {
            this.toggleClass()
        }
    }

    render() {
        const { place, selection } = this.props
        const { active } = this.state
        return(
          <div
            className={ active ? "selected-row list-row": "list-row" } 
            tabIndex="0"
            role="listitem"
            onClick={() => {
            selection(place.id)
            this.toggleClass()
            }}
            onKeyPress={(target) => {
                if(target.charCode===13) {
                    selection(place.id)
                    this.toggleClass()
                }}
            }
          >{place.name}</div>
        )
    }
}
