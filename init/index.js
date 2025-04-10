const mongoose=require('mongoose');
const sampleDataList=require('./data');
const Listing=require('../models/listing');

mngpath="mongodb://127.0.0.1:27017/wanderlust";

main().then((data)=>{
    console.log("succesfully connected");
}).catch((err)=>{
    console.log(err)
});

async function main(){
   await mongoose.connect(mngpath);

}

async function insertAllData() {
    
    await Listing.deleteMany({});
    
    await Listing.insertMany(sampleDataList.data);
    console.log(sampleDataList);
}
insertAllData();

