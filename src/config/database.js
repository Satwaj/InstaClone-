const mongoose = require(`mongoose`)


 async function connecctToDb(){
   await mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    console.log(`Connected to MongoDB`)
  })
}


module.exports = connecctToDb