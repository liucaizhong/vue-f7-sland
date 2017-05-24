const express = require('express')
const http = require('http')
// const url = require('url')
// const querystring = require('querystring')
const router = express.Router()

module.exports = () => {
  //get contacts
  router.get('/contacts', (req, res) => {

    let getUrl = 'http://slandasset.applinzi.com/contacts/API/get.php'
    const getReq = http.get(getUrl, (response) => {
      let body = ''
      response.on('data', (d) => {
        body += d
      })

      response.on('end', () => {
        res.json(JSON.parse(body))
      })
    })

    getReq.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });
    getReq.end();
  })

  return router
}
