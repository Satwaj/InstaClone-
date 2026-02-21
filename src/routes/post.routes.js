const express = require((`express`))
const postRouter = express.Router()
const postController = require(`../controllers/post.controller`)
const identifyUser = require(`../middlewares/auth.middlewares`)
const multer = require(`multer`)
const upload = multer({storage:multer.memoryStorage()})



postRouter.post(`/`, upload.single(`image`),identifyUser ,postController.createPostController)


postRouter.get(`/`, identifyUser, postController.getPostController)

postRouter.get(`/details/:postId`,identifyUser,postController.getPostDetailsController)




module.exports = postRouter
