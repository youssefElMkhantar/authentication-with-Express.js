const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    postedBy: {type: mongoose.Schema.Types.ObjectId , ref: 'User'},
    title : String,
    description: String,
    price: Number,
    imageFile:{
        type: String,
        required: true
    },
    date: {type: Date, 
                default: Date.now  
             }
});

module.exports = mongoose.model('Image', productSchema);