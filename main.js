var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
mapboxgl.accessToken = 'pk.eyJ1IjoibW0xNzI5IiwiYSI6ImNqZWJ2dGY5aTBqZTEycWxhejBxc2hldWQifQ.EMkZrtcfV-TRMg04cBInvg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v10',
    center: [-74.50, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});