import Admin from "../models/AdminSchema.js";
import User from "../models/UserSchema.js";
import Transaction from "../models/TransactionModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Admin Register
export const adminRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields",
            });
        }
        let admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(409).json({
                success: false,
                message: "Admin already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            // password,
            role: "admin", // <- added default role
        });

        return res.status(201).json({ success: true, message: "Admin registered successfully", 
            admin: { _id: newAdmin._id, name: newAdmin.name, email: newAdmin.email, role: newAdmin.role } });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Admin Login
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please enter All Fields",
            }); 
        }
        const admin = await Admin.findOne({ email });
        if (!admin){
            return res.status(401).json({
                success: false,
                message: "admin not found",
            }); 
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        // const isMatch = (password === admin.password);
        if (!isMatch){
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password",
            }); 
        }

        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.status(200).json({
            success: true,
            message: `Welcome back, ${admin.name}`,
            admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
            token: token,
        });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({ success: true, users });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Delete User
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        // console.log(user,id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Delete all transactions related to this user
        await Transaction.deleteMany({ user: user._id });
        
        await User.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
};

// Get All Transactions
// export const getAllTransactions = async (req, res) => {
//     try {
//         const transactions = await Transaction.find();
//         return res.status(200).json({ success: true, transactions });
//     } catch (err) {
//         return res.status(500).json({ success: false, message: err.message });
//     }
// };

// // Delete Transaction
// export const deleteTransaction = async (req, res) => {
//     try {
//         const { id } = req.params;
//         await Transaction.findByIdAndDelete(id);
//         return res.status(200).json({ success: true, message: "Transaction deleted successfully" });
//     } catch (err) {
//         return res.status(500).json({ success: false, message: err.message });
//     }
// };
