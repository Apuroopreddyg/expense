// const host = "https://expense-tracker-app-knl1.onrender.com";
const host = "http://localhost:5000";
// export const setAvatarAPI = `${host}/api/auth/setAvatar`;
export const registerAPI = `${host}/api/auth/register`;
export const loginAPI = `${host}/api/auth/login`;

export const addTransaction = `${host}/api/v1/addTransaction`;
export const getTransactions = `${host}/api/v1/getTransaction`;
export const editTransactions = `${host}/api/v1/updateTransaction`;
export const deleteTransactions = `${host}/api/v1/deleteTransaction`;

export const adminRegister = `${host}/api/admin/register`;
export const adminLogin = `${host}/api/admin/login`;
export const adminGetAllUsers = `${host}/api/admin/getUsers`;
export const adminDeleteUser = `${host}/api/admin/deleteUser/:id`; 

// export const adminUpdateUserRole = `${host}/api/admin/updateUserRole`;
// export const adminDashboardStats = `${host}/api/admin/stats`;