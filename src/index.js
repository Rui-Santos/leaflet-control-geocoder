var L = require('leaflet'),
	Control = require('./control'),
	Nominatim = require('./geocoders/nominatim');

module.exports = L.Util.extend(Control.class, {
  Nominatim: Nominatim.class,
  nominatim: Nominatim.factory
});

export default Geocoder;

L.Util.extend(L.Control, {
  Geocoder: module.exports,
  geocoder: Control.factory
});
