const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    }
});


//it will automatically insert username ,password and hash and salt so not need to insert username nd password
userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', userSchema);

