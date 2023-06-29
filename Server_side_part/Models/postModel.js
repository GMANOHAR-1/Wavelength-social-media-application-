import mongoose from 'mongoose';

const postShcema =new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    desc: String,
    likes: [],
    comments:[],
    image: String
},
    {
        timestamps: true
    });

const PostModel = mongoose.model("POSTS",postShcema)

export default PostModel;