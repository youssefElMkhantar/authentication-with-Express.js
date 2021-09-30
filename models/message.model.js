const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    postedBy: {type: mongoose.Schema.Types.ObjectId , ref: 'User'},
    title : String,
    message: String,
    date: {type: Date, 
                default: Date.now  
             }
});

module.exports = mongoose.model('Message', messageSchema);