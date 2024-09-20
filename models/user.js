const getDb = require('../util/database').getDb
const mongodb = require('mongodb')

class User{
  constructor(name,email,id){
    this.name = name
    this.email = email
    this._id = id
  }

  insertOne(){
    let db = getDb()
   return db.collections('users').insertOne(this)
  }

  static findUserbyID(id){
    id = new mongodb.ObjectId(id)
    let db = getDb()
    return db.collections('users').find({_id:id}).next()

  }


}

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports = User;
