import UserModal from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


export const getAllUsers = async (req, res) => {
    try {
        let users = await UserModal.find()
        users = users.map((user) => {
            const { password, ...otherdetails } = user._doc
            return otherdetails
        });
        res.status(200).json(users)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const user = await UserModal.findById(id);
        if (user) {
            const { password, ...otherdetails } = user._doc
            res.status(200).json(otherdetails)
        }
        else {
            res.status(404).json("no such user")
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id
    const { _id, password } = req.body
    if (id === _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt)
            }
            const user = await UserModal.findByIdAndUpdate(id, req.body, { new: true })
            const token = jwt.sign(
                {
                    username: user.username,
                    id: user._id
                },
                process.env.JWT_KEY, { expiresIn: "1h" }
            )
            res.status(200).json({ user, token })
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json("access denied")
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id

    const { currentuserid, currentuseradminstatus } = req.body
    if (currentuserid === id || currentuseradminstatus) {
        try {
            await UserModal.findByIdAndDelete(id)
            res.status(200).json("user deleted successfully")
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json("access denied")
    }
}


export const followerUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body
    console.log(id,_id)
    if (_id === id) {
        res.status(403).json("action forbidden")
    }
    else {
        try {
            const followUser = await UserModal.findById(id)
            const followinguser = await UserModal.findById(_id);
            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } })
                await followinguser.updateOne({ $push: { following: id } })
                res.status(200).json("user followed")

            }
            else {
                res.status(403).json("user is already followed by you")
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}
export const unfollowerUser = async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body
    if (_id === id) {
        res.status(403).json("action forbidden")
    }
    else {
        try {
            const followUser = await UserModal.findById(id)
            const followinguser = await UserModal.findById(_id);
            if (followUser.followers.includes(_id)) {
                await followUser.updateOne({ $pull: { followers: _id } })
                await followinguser.updateOne({ $pull: { following: id } })
                res.status(200).json("user unfollowed")

            }
            else {
                res.status(403).json("user is not already followed by you")
            }
        }
        catch (err) {
            res.status(500).json(err)
        }
    }
}