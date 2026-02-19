const userModel = require(`../models/user.model`)
const crypto = require(`crypto`)
const jwt = require(`jsonwebtoken`)


async function registerController (req,res) {
  const {username,email,password,bio,profileImage} = req.body

  const isUserAlreadyExist = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

  if(isUserAlreadyExist){
    return res.status(400).json({
      message:"User already exist" + (isUserAlreadyExist.email == email ? "email already Exists " :"username already exists")
    })
  }

  const hash = crypto.createHash(`sha256`).update(password).digest(`hex`)

  const user = await userModel.create({
    username,
    email,
    password:hash,
    bio,
    profileImage
  })

  const token = new jwt.sign({
    id:user._id,

  },process.env.JWT_SECRET,{expiresIn:"1d"}
)

res.cookie(`token`,token)

res.status(201).json({
  message:"User registered successfully",
  user:{
    email:user.email,
    username:user.username,
    bio:user.bio,
    profileImage:user.profileImage
  }

})

}




async function loginController (req,res) {
  const {email,username,password} =req.body


   /**
     * username
     * password
     * 
     * email
     * password
     */

    /**
     * { username:undefined,email:test@test.com,password:test } = req.body
     */


  const user = await userModel.findOne({
    $or:[
      {
        username:username
    },
    {
      email:email
    }
  ]
  })

  const hash = crypto.createHash(`sha256`).update(password).digest(`hex`) 

  const isPasswordValid = hash == user.password
  
  if(!isPasswordValid){
    res.status(400).json({
      message:"password invalid"
    })
  }

const token = jwt.sign({
  id:user._id

},process.env.JWT_SECRET,{expiresIn:"1d"}
)

res.cookie("token", token)
res.status(200).json({
  message:"user login successsfully",
  user:{
    email:user.email,
    username:user.username,
    bio:user.bio,
    profileImage:user.profileImage

  }
})

}

module.exports = {
  registerController,
  loginController
}
