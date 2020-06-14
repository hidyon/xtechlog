const mongoose = require('mongoose')
const CONF = require('../config/config')
const connectTo = 'mongodb://' + CONF.MONGO_DOMAIN + ':' + CONF.MONGO_PORT + '/' + CONF.MONGO_DB
mongoose.connect(
  connectTo,
  {
    "useNewUrlParser" : true,
    "useUnifiedTopology" : true,
    "user" : CONF.MONGO_USER,
    "pass" : CONF.MONGO_PASSWORD,
  }
)

const articleSchema = new mongoose.Schema({
  title : String,
  username : String,
  document : String,
  createDate : { type : Date, default : Date.now },
  updateDate : { type : Date, default : Date.now },
  tags : [ {type : String} ],
  views : { type : Number, default : 0 },
  votes : { type : Number, default : 0 },
  countComments : { type : Number, default : 0 },
  comments : [ { document : String, username : String, timestamp : Date } ],
  files : Object,
})

module.exports = mongoose.model("Article", articleSchema)



