let getDb = require('../util/database').getDb
class Order{
  constructor(userId,products){
    this.userId = userId
    this.products = products
  }

  // getOrders(){
  //   let db = getDb()
  //   return db.collection('orders').find({userId:this.userId})
  // }

  
}

module.exports = Order;
