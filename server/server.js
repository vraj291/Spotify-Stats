const express = require('express')
const cors = require('cors')
require('dotenv').config();
const spotify = require('./spotify')
const lyrics = require('./lyrics')

const app = express()

app.use(cors()) 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/',spotify)
app.use('/api/lyrics',lyrics)

app.listen(process.env.PORT || 8000,() => {
  console.log('Server is now running.')
})