const getDb = require('../util/database').getDb
const mongodb = require('mongodb')
const order = require('./order')
class User{
  constructor(name,email,id,cart){
    this.name = name
    this.email = email
    this._id = id
    this.cart = cart
  }

  insertOne(){
    let db = getDb()
   return db.collection('users').insertOne(this)
  }

  static findUserbyID(id){
    id = new mongodb.ObjectId(id)
    let db = getDb()
    return db.collection('users').find({_id:id}).next()

  }

  addToCart(product,length=0){
    console.log("prr ",product)
    
    const productPrevIdx = this.cart?.items?.findIndex?.((prod)=>{
      return prod.productId.toString() === product._id.toString()
    })
    let newQt = 1
    let updatedCartProducts = [...this.cart.items]

    console.log("idx ",productPrevIdx)
    if(productPrevIdx>=0){
      // updatedCartProducts = [...this.cart.items]
      newQt = this.cart.items[productPrevIdx].quantity+1
      updatedCartProducts[productPrevIdx].quantity = newQt
    }else{
      updatedCartProducts.push({
        productId:new mongodb.ObjectId(product._id),
        quantity:newQt
      })
    }
    const updatedCart = {
      items:updatedCartProducts
    }
    let db = getDb()
    return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{
      $set:{cart:updatedCart}
    })
  }

  getCart(){
    let db = getDb()
    const productIds = this.cart.items.map(p=>{
      return p.productId
    })
    return db.collection('products').find({_id:{$in:productIds}}).toArray().then((products)=>{
      return products.map(p=>{
        return {
          ...p,
          quantity:this.cart.items.find(item=>{
            return item.productId.toString()===p._id.toString()
          }).quantity
        }
      })
    })
  }

  deleteFromCart(id){
    // id = new mongodb.ObjectId()
    console.log("prev ",id,this.cart.items);
    
    let updatedCart = this.cart.items.filter(products=>products.productId!=id)
    
    console.log("up ",updatedCart)
    const db = getDb()
    return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{
      $set:{cart:{items:updatedCart}}
    })
  }

  createOrder(products){
    const db = getDb()
    return db.collection('orders').insertOne({products,userId:this._id})
  }

  
  emptyCart(){
    const db = getDb()
    return db.collection('users').updateOne({_id:new mongodb.ObjectId(this._id)},{
      $set:{cart:{items:[]}}
    })
  }


  getOrders(){
    let db = getDb()
    return db.collection('orders').find({userId:this._id}).toArray()
  }

}

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });

module.exports = User;
