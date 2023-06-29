import PostModel from "../Models/postModel.js";
import UserModal from "../Models/userModel.js";
import mongoose from "mongoose";
export const createpost = async (req, res) => {
    const newPost = new PostModel(req.body)
    try {
        await newPost.save()
        res.status(200).json(newPost)
    }
    catch (err) {
        res.status(500).json(err)
    }
}


export const getPost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    }
    catch (err) {
        res.status(500).json(err)
    }

}

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body
    try {
        const post = await PostModel.findById(postId)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("post updated")
        }
        else {
            res.status(403).json("action forbidden")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }


}


export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body
    try {
        const post = await PostModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("post deleted succesfully")
        }
        else {
            res.status(403).json("action forbidden")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }

}

export const likePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body
    try {
        const post = await PostModel.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("post liked");
        }
        else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("post unliked")
        }
    }
    catch (err) {
        res.status(500).json(err)
    }

}


export const getTimeLinePosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const currentuserposts = await PostModel.find({ userId: userId })
        const followingposts = await UserModal.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: 'posts',
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])
         
        res.status(200).json(currentuserposts.concat(...followingposts[0].followingPosts).sort((a, b) => {
            return b.createdAt - a.createdAt;
        }))
 
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}