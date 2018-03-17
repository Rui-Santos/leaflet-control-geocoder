A simple geocoder for [Leaflet](http://leafletjs.com/) that uses [OSM](https://www.openstreetmap.org/)/[Nominatim](https://wiki.openstreetmap.org/wiki/Nominatim).

# Usage

[Download latest release](https://github.com/Rui-Santos/tpp-leaflet-control-geocoder/releases):

```HTML
<link rel="stylesheet" href="dist/Control.Geocoder.css" />
<script src="dist/Control.Geocoder.js"></script>
```

Add the control to a map instance:

```javascript
var map = L.map('map').setView([0, 0], 2);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
L.Control.geocoder().addTo(map);
```

# Customizing

By default, when a geocoding result is found, the control will center the map on it and place
a marker at its location. This can be customized by listening to the control's `markgeocode`
event. To remove the control's default handler for marking a result, set the option
`defaultMarkGeocode` to `false`.

For example:

```javascript
var geocoder = L.Control.geocoder({
        defaultMarkGeocode: false
    })
    .on('markgeocode', function(e) {
        var bbox = e.geocode.bbox;
        var poly = L.polygon([
             bbox.getSouthEast(),
             bbox.getNorthEast(),
             bbox.getNorthWest(),
             bbox.getSouthWest()
        ]).addTo(map);
        map.fitBounds(poly.getBounds());
    })
    .addTo(map);
```

This will add a polygon representing the result's boundingbox when a result is selected.

# API

## L.Control.Geocoder

This is the geocoder control. It works like any other Leaflet control, and is added to the map.

### Constructor

This plugin supports the standard JavaScript constructor (to be invoked using `new`) as well as the [class factory methods](http://leafletjs.com/reference.html#class-class-factories) known from Leaflet:

```js
new L.Control.Geocoder(options)
// or
L.Control.geocoder(options)
```

### Options

| Option            |  Type            |  Default            | Description |
| ----------------- | ---------------- | ------------------- | ----------- |
| `collapsed`       |  Boolean         |  `true`             | Collapse control unless hovered/clicked |
| `expand`          |  String          |  `"touch"`          | How to expand a collapsed control: `touch` or `click` or `hover` |
| `position`        |  String          |  `"topright"`       | Control [position](http://leafletjs.com/reference.html#control-positions) |
| `placeholder`     |  String          |  `"Search..."`      | Placeholder text for text input
| `errorMessage`    |  String          |  `"Nothing found."` | Message when no result found / geocoding error occurs |
| `geocoder`        |  IGeocoder       |  `new L.Control.Geocoder.Nominatim()` | Object to perform the actual geocoding queries |
| `showResultIcons` |  Boolean         |  `false`            | Show icons for geocoding results (if available); supported by Nominatim |

### Methods

| Method                                |  Returns            | Description       |
| ------------------------------------- | ------------------- | ----------------- |
| `markGeocode(<GeocodingResult> result)` |  `this`               | Marks a geocoding result on the map |

## L.Control.Geocoder.Nominatim

Uses [Nominatim](https://wiki.openstreetmap.org/wiki/Nominatim) to respond to geocoding queries. This is the default
geocoding service used by the control, unless otherwise specified in the options. Implements ```IGeocoder```.

Unless using your own Nominatim installation, please refer to the [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/).

### Constructor

```js
new L.Control.Geocoder.Nominatim(options)
// or
L.Control.Geocoder.nominatim(options)
```

## Options

| Option          |  Type            |  Default          | Description |
| --------------- | ---------------- | ----------------- | ----------- |
| `serviceUrl`       | String          |  `"https://nominatim.openstreetmap.org/"` | URL of the service |
| `geocodingQueryParams`       | Object          |  `{}` | Additional URL parameters (strings) that will be added to geocoding requests; can be used to restrict results to a specific country for example, by providing the [`countrycodes`](https://wiki.openstreetmap.org/wiki/Nominatim#Parameters) parameter to Nominatim |
| `reverseQueryParams`       | Object          |  `{}` | Additional URL parameters (strings) that will be added to reverse geocoding requests |
| `htmlTemplate`     | function        | special           | A function that takes an GeocodingResult as argument and returns an HTML formatted string that represents the result. Default function breaks up address in parts from most to least specific, in attempt to increase readability compared to Nominatim's naming

## IGeocoder

An interface implemented to respond to geocoding queries.

### Methods

| Method                                |  Returns            | Description       |
| ------------------------------------- | ------------------- | ----------------- |
| `geocode(<String> query, callback, context)` | `GeocodingResult[]` | Performs a geocoding query and returns the results to the callback in the provided context |
| `reverse(<L.LatLng> location, <Number> scale, callback, context)` | `GeocodingResult[]` | Performs a reverse geocoding query and returns the results to the callback in the provided context |

## GeocodingResult

An object that represents a result from a geocoding query.

### Properties

| Property     | Type             | Description                           |
| ------------ | ---------------- | ------------------------------------- |
| `name`       | String           | Name of found location                |
| `bbox`       | L.LatLngBounds   | The bounds of the location            |
| `center`     | L.LatLng         | The center coordinate of the location |
| `icon`       | String           | URL for icon representing result; optional |
| `html`       | String           | (optional) HTML formatted representation of the name |
