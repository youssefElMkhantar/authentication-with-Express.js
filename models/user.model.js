const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : String,
    email: String,
    password: String,
    date: {type: Date, 
                default: Date.now  
             }
});



module.exports = mongoose.model('User', userSchema);