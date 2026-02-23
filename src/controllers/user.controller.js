const followModel = require("../models/follow.model")
const userModel = require ("../models/user.model")

async function followUserController (req,res){

  const followerUsername = req.user.username
  const followeeUsername = req.params.username


  if(followeeUsername == followerUsername){
    return res.status(400).json({

      message:"you cannot follow yourself"

    })
  }

  const isFolloweeExists = await userModel.findOne({
    username:followeeUsername
  })




  if(!isFolloweeExists) {
    return res.status(404).json({
    message:"user you trying to follow does not exist"  
    })
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower:followerUsername,
    followee:followeeUsername

  })

  if(!isAlreadyFollowing) {
    return res.status(200).json({
      message:`You are Already Following ${followeeUsername}`,
      follow:isAlreadyFollowing
    })
  }



  const followRecord = await followModel.create({
    follower:followerUsername,
    followee:followeeUsername
  })

  
  res.status(201).json({
    message:`you are now following ${followeeUsername}`,
    follow : followRecord
  }) 

}


async function unFollowUserController  (req,res)  {

  const followerUsername = req.user.username
  const followeeusername = req.params.username

  const isUserFollowing = await followModel.findOne({
    followee:followeeusername,
    follower:followerUsername
  })
  

  if(!isUserFollowing){
    return res.status(200).json({
      message:`you are not following ${followeeusername} `

    })
  }

  await followModel.findByIdAndDelete(isUserFollowing.id)

  res.status(200).json({
    message:`you have unfollow ${followeeusername}`
  })
}



module.exports ={
  followUserController,
  unFollowUserController,
}


