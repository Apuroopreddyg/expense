import mongoose from "mongoose";
import validator from "validator";
// import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Admin email is required"],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    role: {
        type: String,
        enum: ["admin"],
        default: "admin"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Optional: Auto-hash password before saving
// adminSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password, 10);
//     next();
// });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
