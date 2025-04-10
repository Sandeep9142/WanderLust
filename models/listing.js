const mongoose=require('mongoose');

Schema=mongoose.Schema;

let listSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        default:"../public/images/pexels-pixabay-25154.jpg",
        set:(v)=>v===""?".\.\public\images\pexels-pixabay-258154.jpg":v
    },
    price:Number,
    location:String,
    country:String
});

let Listing=mongoose.model("Listing",listSchema);

module.exports=Listing;

