const getDb = require('../util/database').getDb
const mongodb = require('mongodb')
class Product{
  constructor(title,price,imageUrl,description,id){
    this.title=title
    this.price=price
    this.imageUrl=imageUrl
    this.description=description
    this._id= id!=null?new mongodb.ObjectId(id):null
  }

  save(){
    const db = getDb()
    let resultant
    if(this._id){    
      console.log("16",this)  
      resultant = db.collection('products').updateOne({_id:this._id},{$set:this})
    }else{
      console.log("19")  
      resultant = db.collection('products').insertOne(this)
    }
    return resultant.then((res)=>{
      console.log("resss ",res)
    }).catch(err=>{
      console.log("err while inserting data ",err)
    })

  }

  static fetchAll(){
    const db = getDb()
     return db.collection('products').find().toArray().then((res)=>{
      console.log("resss ",res)
      return res
    }).catch(err=>{
      console.log("err while inserting data ",err)
    })

  }



  static findById(id){
    const db = getDb()
    id = new mongodb.ObjectId(id)
    return db.collection('products').find({_id:id}).next().then(res=>
    {
      console.log("one element ",res)
      return res
    }
    ).catch(err=>{
      console.log("error while finding one element: ",err)
    })
  }

  static deleteById(id){
    const db = getDb()
    id = new mongodb.ObjectId(id)
    return db.collection('products').deleteOne({_id:id}).then(res=>{console.log("deleted")}).catch(err=>console.log("err while deleting"))
  }
}
module.exports = Product;
