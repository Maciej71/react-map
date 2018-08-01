import React from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MapControl from "./MapControl";
import PlaceMarker from "./PlaceMarker"

/*global google*/
const style = require("./style.json")

// handleMarkerClick(marker) {
//   marker.showInfo = true;
//   this.setState(this.state);
// }
//
// handleMarkerClose(marker) {
//   marker.showInfo = false;
//   this.setState(this.state);
// }

//Async api call via HOC
const PlacesMap = withScriptjs(withGoogleMap((props) =>{
  //create list of markers
  const markers = props.places.map( place => <PlaceMarker
    key={place.id}
    location={place.location}
    icon={place.icon}
    />);
  return (
    //Create map with markers and controls
      <GoogleMap
        defaultOptions={{ styles: style }}
        defaultZoom={14}
        center={{ lat: 50.06, lng: 19.935 }}
        >
        {markers}
        <MapControl position={google.maps.ControlPosition.BOTTOM_CENTER}>
        <div className="credits">
          <div className="icon-credits">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0</a></div>
          <div className="map-style-credits">Map style from <a href="https://snazzymaps.com/style/151/ultra-light-with-labels" title="ultra-light-with-labels">Snazzy Maps</a></div>
        </div>
        </MapControl>
      </GoogleMap>
    );
  }
))

export default PlacesMap;
