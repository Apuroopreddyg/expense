import express from "express";
import { adminRegister, adminLogin, getAllUsers, deleteUser} from "../controllers/adminController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);

router.get("/getUsers", getAllUsers);
router.delete("/deleteUser/:id", deleteUser);
// router.get("/transactions", getAllTransactions);
// router.delete("/transaction/:id", deleteTransaction);

export default router;

// r`;
// export const adminLogin = `${host}/api/admin/login`;
// export const adminGetAllUsers = `${host}/api/admin/getUsers`;
// export const adminDeleteUser = `${host}/api/admin/deleteUser`;
// export const adminUpdateUserRole = `${host}/api/admin/updateUserRole`;
// export const adminDashboardStats = `${host}/api/admin/stats`;