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
          required: true,
        },
        quantity:{type:Number,required:true}
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
