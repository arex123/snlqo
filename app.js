const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const User = require('./models/user')
// const db = require('./util/database').mongodbClient
const mongoose = require('mongoose')
const app = express();
require('dotenv').config()

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findById('66ee556f16b1cb8afe1ad3b2')
    .then(user => {
      req.user = user
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(process.env.mongodbURL).then(res=>{
  console.log("db connected")

  User.findOne().then(user=>{
    if(!user){
      let newUser = new User({name:"Adi",email:'adi@email.com',cart:{items:[]}})
      newUser.save()
    }
  })
  app.listen(3001)
}).catch(err=>{
  console.log("db not connected:",err)
})