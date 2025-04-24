const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const Review=require('./reviewModel.js');
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
    country:String,
    review:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review" 
        }
    ]});






//mongoose middleware will run after calling the delete listing it will just delete all review which are
//atached with this listing

listSchema.post("findOneAndDelete",async (list)=>{
    if(list){
        await Review.deleteMany({_id:{$in: list.review}});
    }
})


let Listing=mongoose.model("Listing",listSchema);
module.exports=Listing;

