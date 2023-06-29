import UserModal from "../Models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export const registerUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedpassword;
    const newUser = new UserModal(req.body)
    const { email } = req.body;
    try {
        const olduser = await UserModal.findOne({ email })
        if (olduser) {
            return res.status(400).json({ message: "email already used" })
        }
        const user = await newUser.save()
        const token = jwt.sign({
            email: user.email,
            id: user._id
        }, process.env.JWT_KEY, { expiresIn: '1h' })
         
        res.status(200).json({ user, token })
    } catch (err) {
        res.status(500).json({ message: err.message })
        console.log(err);
    }
}

export const loginUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const user = await UserModal.findOne({ email: email })

        if (user) {
            const validity = await bcrypt.compare(password, user.password)
            if (!validity) {
                res.status(400).json("wrong password")
            }
            else {
                const token = jwt.sign({
                    email: user.email,
                    id: user._id
                }, process.env.JWT_KEY, { expiresIn: '1h' })
                res.status(200).json({user,token})
            }
        }
        else {
            res.status(404).json("User doesnot exist")
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message })
    }
}