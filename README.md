geoseeds
========

Node.js module for seeding random location point around center within given radius

## Installation

  npm install geoseeds --save

## Usage

  var geoseeds = require('geoseeds');

  /* Let's seed 25 points in a 1km radius arount my lovely cafe */
  var lat = 40.178801, 
      lon = 44.510547,
      radius = 1000,
      amount = 25;
      

  console.log(JSON.stringify(geoseeds.add(lat,lon,radius,amount)));
