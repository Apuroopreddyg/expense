import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerControllers = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields",
            });
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user", // <- added default role
        });
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}


export const loginControllers = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }); 
        }
        const user = await User.findOne({ email });
        if (!user){
            return res.status(401).json({
                success: false,
                message: "User not found",
            }); 
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password",
            }); 
        }

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${user.name}`,
            user: { id: user._id, name: user.name, email: user.email, role: user.role },
            token: token,
        });
    }
    catch(err){
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// export const setAvatarController = async (req, res, next)=> {
//     try{
//         const userId = req.params.id;
//         const imageData = req.body.image;
//         const userData = await User.findByIdAndUpdate(userId, {
//             isAvatarImageSet: true,
//             avatarImage: imageData,
//         },
//         { new: true });
//         return res.status(200).json({
//             isSet: userData.isAvatarImageSet,
//             image: userData.avatarImage,
//           });
//     }catch(err){
//         next(err);
//     }
// }

export const allUsers = async (req, res, next) => {
    try{
        const user = await User.find({_id: {$ne: req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);

        return res.json(user);
    }
    catch(err){
        next(err);
    }
}