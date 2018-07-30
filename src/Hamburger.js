import { slide as Menu } from 'react-burger-menu'
import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Hamburger extends Component {
  showSettings (event) {
    event.preventDefault();
  }

  static propTypes = {
		places: PropTypes.array.isRequired
	}
  render () {
    const { places } = this.props
    return (
      <Menu noOverlay pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" }>
      <div className="List">
        <h2>Filters</h2>
        <h2>Places</h2>
          <div>
            <li className="places-list">
            {places.map((place, index) => {
              return(
                <li key={place.id} className="place">
                  {place.name}
                </li>
              )
            }
            )}
            </li>
          </div>  
      </div>
        {/* <a id="home" className="menu-item">Home</a>
        <a id="about" className="menu-item">About</a>
        <a id="contact" className="menu-item">Contact</a>
        <div className="test">
          <div className="tes">
          <div>aaaaaa</div>
          <div>bbbbbb</div>
          </div>
          <div>sdsadsad</div>
        </div>
        <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
      </Menu>
    );
  }
}