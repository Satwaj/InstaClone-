const express = require(`express`)
const userController = require(`../controllers/user.controller`)
const identifyUser = require(`../middlewares/auth.middlewares`)

const userRouter = express.Router()


/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */

userRouter.post(`/follow/:username`, identifyUser, userController.followUserController)

/** 
 * @route POST /api/users/unfollow/:userid
 * @description Unfollow a user
 * @access Private
 */

userRouter.post(`/unfollow/:username`, identifyUser, userController.unFollowUserController)

module.exports = userRouter

