const mongoose = require('mongoose')
const connectdb=async()=>{
   try { mongoose.set('strictQuery', true)
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" Data Base Connected successfully :) ");
   } catch (error) {
    console.log(error)
    
   }
}
module.exports=connectdb