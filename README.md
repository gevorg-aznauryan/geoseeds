geoseeds
========

Node.js module for seeding random location point around center within given radius

## Installation

  npm install geoseeds --save

## Usage

  var geoseeds = require('geoseeds');
      

  var lat = 40.178801, 
      lon = 44.510547,
      radius = 1000, // 1km
      amount = 25; // 25 points to seed
      

  console.log(JSON.stringify(geoseeds.add(lat,lon,radius,amount)));
