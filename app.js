const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const User = require('./models/user')
const db = require('./util/database').mongodbClient
const app = express();
require('dotenv').config()

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findUserbyID('66eda901b20e4e24e9287b5a')
    .then(user => {
      req.user = new User(user.name,user.email,user._id,user.cart);
      next();
    })
    .catch(err => console.log(err));
  // next()
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

// app.use(errorController.get404);

db(()=>{
  // console.log("33")

  app.listen(3001)
})
