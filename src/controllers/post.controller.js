const postModel = require(`../models/post.model`)
const jwt = require(`jsonwebtoken`)
const ImageKit = require(`imagekit`)

const imagekit = new ImageKit ({
  urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})


  async function createPostController (req,res) {

  
  const file = await imagekit.upload({
    file: req.file.buffer,  // just pass buffer directly
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts"
  })


  const post = await postModel.create({
    caption:req.body.caption,
    imageUrl:file.url,
    user:req.user.id
  })

  res.status(201).json({
    message:"Post Created Successfully",
    post
  })

}






async function getPostController (req,res){

const userId = req.user.id

const posts = await postModel.find({
  user:userId
})

res.status(200).json({
  message:"Posts fetched successfully",
  posts
})

}





async function getPostDetailsController (req,res){

  const userId = req.user.id

  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message:"Post not found"
    })
  }


  const isValidUser = post.user.toString() ===   userId

  if(!isValidUser){
    return res.status(403).json({
      message:"Forbidden Content"
    })
  }

  return res.status(200).json({
    message:"Post details fetched successfully",
    post
  })


}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController
}

