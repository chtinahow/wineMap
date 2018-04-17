const functions = require('firebase-functions')
const fetch = require('node-fetch')
const cors = require('cors')({origin: true})

const apiKey = 'dm2umigp683o6ied149g1hdckyn0vyf9zpjkqqg4x7ny1qee'

const queryToString = (queryObject) => {
  return Object.keys(queryObject).map(key => `${key}=${queryObject[key]}`).join('&')
}

exports.wineSearch = functions.https.onRequest((request, response) => {
  const wineParams = queryToString(request.query)
  cors(request, response, () => {
    fetch(`http://api.snooth.com/wines/?akey=${apiKey}&${wineParams}`)
    .then(res => res.json())
    .then(json => response.send(json))
  })
});
