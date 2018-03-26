let mapboxgl = require('mapbox-gl');
let MapboxDraw = require('@mapbox/mapbox-gl-draw');
let path = require('path');
let ToggleControl = require('./button.js');

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


// Additional controls for each UAV
var uavs = ['main drone', 'uav 1', 'uav 2']
var uavColors = ['#000000', '#0000FF', '#FF00FF']
var toggle = new ToggleControl(uavs, uavColors, draw)
map.addControl(toggle, 'top-right')

map.addControl(draw);

