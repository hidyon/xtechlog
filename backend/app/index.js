
// express
const express = require('express')
const app = express()

// アクセスログは access.log へ出力
const fs = require('fs')
const logger = require('morgan')

const accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})
app.use(logger('combined', {stream: accessLogStream}))


// body parser
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// CROS
const cors = require('cors')
app.use(cors())


// router /articles
const articleRoutes = require('./routes/api/articles/index')
app.use('/api/articles', articleRoutes)


app.listen(process.env.PORT || 3000)


