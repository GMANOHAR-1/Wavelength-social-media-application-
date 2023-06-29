import  express from "express";
import { deleteUser, followerUser, getAllUsers, getUser, unfollowerUser, updateUser } from '../Controllers/UserController.js'
  import authMiddleWare from "../middleware/authMiddleware.js";
const router = express.Router()

router.get('/',getAllUsers)
router.get('/:id',getUser)
router.put('/:id',authMiddleWare,updateUser)
router.delete('/:id',authMiddleWare,deleteUser)
router.put('/:id/follow',authMiddleWare,followerUser)
router.put('/:id/unfollow',authMiddleWare,unfollowerUser)

export default router;