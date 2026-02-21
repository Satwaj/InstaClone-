const postModel = require(`../models/post.model`)
const jwt = require(`jsonwebtoken`)
const ImageKit = require(`imagekit`)

const imagekit = new ImageKit ({
  urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT,
  publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY
})


  async function createPostController (req,res) {

  console.log(req.body,req.file)

  const token = req.cookies.token

  if(!token){
    return res.status(401).json({message:"Token not provided , Unauthorized Access"})
  }

  let decoded 
  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }
  catch(err){
    return res.status(401).json({message:"Invalid Token , Unauthorized Access"})
  }



  console.log(decoded)



  const file = await imagekit.upload({
    file: req.file.buffer,  // just pass buffer directly
    fileName: "Test",
    folder: "cohort-2-insta-clone-posts"
  })


  const post = await postModel.create({
    caption:req.body.caption,
    imageUrl:file.url,
    user:decoded.id
  })

  res.status(201).json({
    message:"Post Created Successfully",
    post
  })

}






async function getPostController (req,res){

  const token = req.cookies.token

  if(!token){
    return res.status(401).json
    ({
      message:"Unauthorized Access"
    })
  }


let decoded

try
{
  decoded = jwt.verify(token , process.env.JWT_SECRET)
}
catch(err)
{
  return res.status(401).json({message:"Invalid Token"})
}

const userId = decoded.id

const posts = await postModel.find({
  user:userId
})

res.status(200).json({
  message:"Posts fetched successfully",
  posts
})

}





async function getPostDetailsController (req,res){

   console.log(req.body,req.file)

  const token = req.cookies.token

  if(!token){
    return res.status(401).json
    ({
      message:"Token not provided , Unauthorized Access"
    })
  }

  let decoded 

  try{
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  }

  catch(err){
    return res.status(401).json
    ({
      message:"Invalid Token , Unauthorized Access"
    })
  }

  const userId = decoded.id

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

