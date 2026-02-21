const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption:{
    type:String,
    required:true,
    default:""
  },
  imageUrl:{
    type:String,
    required:[true,"image Is required for creating an post"]
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:[true,"user is required for creating an post"]
  }


})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel