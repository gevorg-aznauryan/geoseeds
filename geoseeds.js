!(function(){
'use strict';
// exported module
var geoseeds = {};
geoseeds.version = "1.0.0";
geoseeds.add = function (lat,lon,radius,amount,shape) {
    if (typeof amount == 'undefined') { amount = 1; }
    if (typeof lon == 'undefined') { lon = 0; }
    if (typeof lat == 'undefined') { lat = 0; }
    if (typeof radius == 'undefined') { radius = 1000; } // 1 km
    if (typeof shape == 'undefined') { shape = 'circle'; } // 1 km
    
    var seeds = [];
    for(var i=0;i<amount;++i)
        seeds.push(geoseeds.Helpers.CalculateRandomSeedPosition({lat: lat, lon: lon},radius,shape));

    return seeds;
    };
geoseeds.move = function (lat,lon,distance,angle) {
    if (typeof lon == 'undefined') { lon = 0; }
    if (typeof lat == 'undefined') { lat = 0; }
    if (typeof distance == 'undefined') { distance = 0; } // 10 m
    
    return geoseeds.Helpers.CalculateSeedPositionCircle({lat: lat, lon: lon},distance,angle);
    };

geoseeds.Helpers = {};
geoseeds.Helpers.ER = 6378137.0;   //  WGS-84 ellipsoid parameters
geoseeds.Helpers.DTR = Math.PI / 180;
geoseeds.Helpers.RTD = 180 / Math.PI;

geoseeds.Helpers.CalculateRandomSeedPosition = function ( center, distance, shape )
{
    
    if('square' == shape)
    {
        var randDistanceP =  distance * Math.random() * Math.random() > 0.5 ? 1 : -1;
        var randDistanceM =  distance * Math.random() * Math.random() > 0.5 ? 1 : -1;
        
        return this.CalculateSeedPositionSquare( center, randDistanceP, randDistanceM);
    }
    else if('circle' == shape)
    {
        var angle = 360 * Math.random();
        var randDistance =  distance * Math.random();
    
        return this.CalculateSeedPositionCircle( center, randDistance, angle);
    }
    else 
        return null;
        
}
geoseeds.Helpers.CalculateSeedPositionCircle = function ( center, distance, angle)
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
geoseeds.Helpers.CalculateSeedPositionSquare = function ( center, distanceP, distanceM )
{
    var latA = center.lat * this.DTR;
    var lonA = center.lon * this.DTR;
    var angDistanceP = distanceP * this.DTR;
    var angDistanceM = distanceM * this.DTR;

    return {lat: (latA+angDistanceP) * this.RTD, lon: (lonA+angDistanceM) * this.RTD};
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