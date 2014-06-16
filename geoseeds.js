!(function(){
'use strict';
// exported module
var geoseeds = {};
geoseeds.version = "1.0.0";
geoseeds.add = function (lat,lon,radius,amount) {
    if (typeof amount == 'undefined') { amount = 1; }
    if (typeof lon == 'undefined') { lon = 0; }
    if (typeof lat == 'undefined') { lat = 0; }
    if (typeof radius == 'undefined') { radius = 1000; } // 1 km
    
    var seeds = [];
    for(var i=0;i<amount;++i)
        seeds.push(geoseeds.Helpers.CalculateRandomSeedPosition({lat: lat, lon: lon},radius));

    return seeds;
    };

geoseeds.Helpers = {};
geoseeds.Helpers.ER = 6378137.0;   //  WGS-84 ellipsoid parameters
geoseeds.Helpers.DTR = Math.PI / 180;
geoseeds.Helpers.RTD = 180 / Math.PI;

geoseeds.Helpers.CalculateRandomSeedPosition = function ( center, distance )
{
    var angle = 360 * Math.random();
    return this.CalculateSeedPosition( center, distance, angle);
}
geoseeds.Helpers.CalculateSeedPosition = function ( center, distance, angle)
{
    var latA = center.lat * this.DTR;
    var lonA = center.lon * this.DTR;
    var angDistance = distance / this.ER;
    var radAngle = angle * this.DTR;

    var lat = Math.asin(
        Math.sin(latA) * Math.cos(angDistance) + 
        Math.cos(latA) * Math.sin(angDistance) * Math.cos(radAngle));

    var dlon = Math.atan2(
        Math.sin(radAngle) * Math.sin(angDistance) * Math.cos(latA), 
        Math.cos(angDistance) - Math.sin(latA) * Math.sin(lat));

    var lon = ((lonA + dlon + Math.PI) % (Math.PI * 2)) - Math.PI;

    return {lat: lat * this.RTD, lon: lon * this.RTD};
}


if (typeof define == 'function'){
   define(function(){
		return geoseeds;
   });
}
else if(typeof module !== 'undefined' && module.exports) {
	module.exports = geoseeds;
}
else {
	window.geoseeds = geoseeds;
}

}());