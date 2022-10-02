'use strict';
const fs = require('fs');
var request = require('request');
const config = require('./config.json')

module.exports={call5min, call15min, callDaily}

function call5min(){
    let url =`https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min&apikey=${config['alphavantageAPI-key']}`
  // API HTTP CALL 
    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
     }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        const d = data["Time Series FX (5min)"]
        fs.writeFileSync('intra5.json', JSON.stringify(d[Object.keys(d)[0]]['4. close']))
      }
   })
}
function call15min(){
    let url =`https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=15min&apikey=${config['alpha-key']}`
  // API HTTP CALL 
    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
     }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // data is successfully parsed as a JSON object:
        const d = data["Time Series FX (15min)"]
        fs.writeFileSync('intra15.json', JSON.stringify(d[Object.keys(d)[96]]['4. close']))
      }
   })
}
function callDaily(){
  let url =`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=${config['alpha-key']}`
// API HTTP CALL 
  request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
   }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      const d = data["Time Series FX (Daily)"]
      fs.writeFileSync('daily.json', JSON.stringify(d[Object.keys(d)[7]]['4. close']))
    }
 })
}