 const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hotelSchema = new Schema({

    user : {
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    
    hotelName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    utilities: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Hotel",hotelSchema);