import mongoose from "mongoose";
const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },

        firstname: {
            type: String,
            required: true
        }
        ,
        lastname: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesin: String,
        worksAt:String,
        skills: [], 
        status: String,
        country:String,
        followers: [],
        following: [],
        others:String 
    },
    {
        timestamps: true
    }
)

const UserModal = mongoose.model("Users", userSchema);
export default UserModal;