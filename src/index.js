import L from 'leaflet';
import Control from './control';
import Nominatim from './geocoders/nominatim';

var Geocoder = L.Util.extend(Control.class, {
  Nominatim: Nominatim.class,
  nominatim: Nominatim.factory
});

export default Geocoder;

L.Util.extend(L.Control, {
  Geocoder: Geocoder,
  geocoder: Control.factory
});
