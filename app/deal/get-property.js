var express = require('express');
var dotenv = require('dotenv');
var axios = require('axios');


var config = {
  method: 'get',
  url: 'https://api.hubapi.com/crm/v3/objects/deals?ACCESS_TOKEN=pat-eu1-b87bbedc-e1bb-45d7-b114-504a1733caf8&limit=100',
  headers: { 
    'Authorization': 'Bearer pat-eu1-b87bbedc-e1bb-45d7-b114-504a1733caf8'
  }
};

async function getProperty() {
  // console.log('log')
  await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

}

module.exports = getProperty;