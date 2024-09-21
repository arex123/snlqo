const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  email: String,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref:'Product',
          required: true,
        },
        quantity:{type:Number,required:true}
      },
    ],
  },
});

userSchema.methods.addToCart = function(product){
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
        productId:product._id,
        quantity:newQt
      })
    }
    const updatedCart = {
      items:updatedCartProducts
    }
    this.cart = updatedCart
    return this.save()
}

userSchema.methods.getCart = function(){
  return this.cart.items
}
userSchema.methods.deleteFromCart = function(id){
  
  let updatedCart = this.cart.items.filter(products=>products.productId!=id)
  this.cart.items = updatedCart
  
  return this.save()

}


userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};



module.exports = mongoose.model("User", userSchema);
