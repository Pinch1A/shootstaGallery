require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import serveIndex from 'serve-index'
import routes from './routes'

const videoFolder = process.env.DIR || './public/'
const PORT = process.env.PORT || 8080
const app = express()

app.set('port', PORT)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/ftp', express.static('public'), serveIndex('public', { icons: true }))

app.use('/', routes)
app.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT)
})

module.exports = app //exporting app.js as module
