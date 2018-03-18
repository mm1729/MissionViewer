let mapboxgl = require('mapbox-gl');
let MapboxDraw = require('@mapbox/mapbox-gl-draw');
let path = require('path');

const mapsFolder = path.resolve(__dirname, 'maps/');
const mapsFile = 'map.json';
var stl_json = require('./styles/json-style.json');


// READ maps file
var geojsonData = require(path.resolve(mapsFolder, mapsFile));

// CREATE custom map style
delete stl_json.sources['mapbox'];
stl_json.sources['jsonsource'] = {
    type: 'geojson',
    data: geojsonData
};

// CREATE map object
mapboxgl.accessToken = 'pk.eyJ1IjoibW0xNzI5IiwiYSI6ImNqZWJ2dGY5aTBqZTEycWxhejBxc2hldWQifQ.EMkZrtcfV-TRMg04cBInvg';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: stl_json,
    // style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [-74.466, 40.5463], // starting position [lng, lat]
    zoom: 14, // starting zoom
    pitch: 45,
    bearing: -17.6,
    hash: true
});

// ENABLE map draw controls
var draw = new MapboxDraw({
    displayControlsDefault: true,
    controls: {
        point: true,
        polygon: true,
        trash: true
    }
});

map.addControl(draw);