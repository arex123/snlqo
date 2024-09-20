const mongodb = require('mongodb')
const client = mongodb.MongoClient;
// console.log("db url ",process.env.mongodbURL)

let _db;
const mongodbClient = callback => {
  client.connect(process.env.mongodbURL).then((res)=>{
    // console.log("res" ,res)
    _db = res.db()
    callback()
  }).catch(err=>{
    console.log("err while connecting db ",err)
    throw err
  })
}

const getDb = ()=>{
  if(_db){
    return _db
  }
  throw 'No database found'
}

exports.mongodbClient = mongodbClient
exports.getDb = getDb