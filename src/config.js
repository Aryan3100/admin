const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URL).then(()=>{
    console.log('database is connected')
}).catch((err)=>{
 console.log(err)
 
})

const user  = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const User = mongoose.model('User', user)

module.exports = User;