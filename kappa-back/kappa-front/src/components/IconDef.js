import L from 'leaflet';
import icon from '../assets/images/recicle.png';


export const IconDef = L.icon({
  iconUrl: icon,
  iconRetinaUrl: require('../assets/images/recicle.png'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-venue-icon'
});

