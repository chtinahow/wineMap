const express = require('express')
const cors = require('cors')
const api = require('./wine-map-api')

const app = express()
app.use(cors())

app.get('/', async (req, res) => {
  res.send('Wine API')
})


app.listen(4696, () => {
  console.log('Wine Search runnning on port 4696!')
})
