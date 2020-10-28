const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    book : [
        {
            type: Schema.Types.ObjectId,
            ref:'Hotel'
        }
    ], 
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.bookNow = function(hotel){
    const updatedCartProduct = this.book.items;
    updatedCartProduct.push({
        HotelId: hotel._id,
        quantity: 1
    })
    this.book.items = updatedCartProduct;
    return this.save();
    
}

module.exports = mongoose.model("User", userSchema);