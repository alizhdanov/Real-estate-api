var express = require('express')
var app = express()
const routes = require('./routes')

app.use('/', routes)

app.listen(7799, () => console.log('Example app listening on port 7799!'))