import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {IconDef} from './IconDef';


// We use the code below to be able of iterating over the complete set of data. Note that the argument
// of  MarkersDef is given in the main MapComponent.js component.
// To iterate over each of the elements of the json data file  we use the map() method.
// This method takes the arguments arg_venue and index to apply the arrow function (which in this case
// puts a Marker with those determided parameters), and returns the elements for MarkersDef. 
// See documentation in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map


// VenueMarkers and MarkersDef are in fact arrows function. To write the "const" is necessary because in javascript
// one can not leave the variables without being declared.

const VenueMarkers = (properties) => {
  const { LocalVenues } = properties;

  const MarkersDef = LocalVenues.map((arg_venue, index) => (
    <Marker key={index} position={arg_venue.geometry} icon={IconDef} >

    </Marker>
  ));

  return <Fragment>{MarkersDef}</Fragment>
};

export default VenueMarkers;
