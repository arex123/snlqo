const mongodb = require('mongodb')
const client = mongodb.MongoClient;
console.log("db url ",process.env.mongodbURL)
const mongodbClient = callback => {
  client.connect(process.env.mongodbURL).then((res)=>{
    console.log("res" ,res)
    callback(res)
  }).catch(err=>{
    console.log("err while connecting db ",err)
  })
}

module.exports = mongodbClient