import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import MapControl from "./MapControl"
import PlaceMarker from "./PlaceMarker"

/*global google*/
const style = require("./style.json")

//Async api call via HOC
const PlacesMap = withScriptjs(withGoogleMap((props) =>{
  //create list of markes
  const markers = props.places.map((place) => {
    //get rating
    const rating = props.foursquare.filter((rating) => rating.id === place.id)[0].rating
    const marker =
    <PlaceMarker
      key={place.id}
      location={place.location}
      icon={place.icon}
      id={place.id}
      selectPlace={ props.selectPlace }
      deselectPlace={ props.deselectPlace }
      rating={ rating }
      //check if marker should be selected
      selected={ props.selected.includes(place.id) }
    />;
    return marker
  });
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
          <div className="style-api-credits">Map style <a href="https://snazzymaps.com/style/151/ultra-light-with-labels" title="ultra-light-with-labels">Snazzy</a> Rating api <a href="https://developer.foursquare.com/" title="">Foursquare</a></div>
          <div className="icon-credits">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0</a></div>
        </div>
        </MapControl>
      </GoogleMap>
    );
  }
))

export default PlacesMap;
