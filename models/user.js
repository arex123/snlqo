const getDb = require('../util/database').getDb
const mongodb = require('mongodb')

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
