import React from "react";
import { MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css'; // This line was necessary in order to correctly show the map
import MarkersDef from './VenueMarkers';
import data from '../assets/data';


export default function MapComponent() {
  const position = [52.52437, 13.41053];

  
  return (
    <div>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
     
     <MarkersDef LocalVenues={data.venues}/>
        
      </MapContainer>
    </div>
  );
}
