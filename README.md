💰 Expense Tracker & Admin Dashboard
A full-stack web application where users can track their expenses and admins can manage users and transactions. Built with MERN stack (MongoDB, Express, React, Node.js) and styled using React-Bootstrap.

📚 Features
🧑‍💼 For Users:
📊 Track personal expenses (CRUD operations on transactions)

🗂 Categorize transactions (e.g., Food, Rent, Salary)

💼 View recent transactions with filtering & sorting options

📅 Track by date, category, and transaction type (income/expense)

🛡 For Admins:
👥 Manage users (view, delete users)

💸 Manage all user transactions

🗑 Automatically delete a user's transactions when a user is deleted

📈 Future-ready for admin-level reporting and analytics

🏗 Tech Stack
Frontend: React, React-Bootstrap, Axios

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

📂 Folder Structure
bash
Copy
Edit
/backend
  └── controllers
  └── models
  └── routes
  └── server.js

/frontend
  └── src
      ├── components
      ├── pages
      ├── App.js
      └── index.js
      
🚀 Getting Started

1. Clone the repository:
  git clone https://github.com/your-username/expense-tracker-admin.git
  cd expense-tracker-admin
2. Install dependencies:
  Backend:
    cd backend
    npm install
  Frontend:
    cd ../frontend
    npm install
3. Setup environment variables:
  Create a .env file inside /backend:
  
  env
  MONGO_URI=your_mongodb_connection_string
  PORT=5000
  
4. Run the project:
  Backend:
  npm run dev
  Frontend:
  npm start

🎯 API Endpoints
  Method	Endpoint	Description
  GET	/api/users	Admin - Get all users
  DELETE	/api/users/:id	Admin - Delete a user and their expenses
  GET	/api/transactions	User - Get all personal transactions
  POST	/api/transactions	User - Add a transaction
  DELETE	/api/transactions/:id	User - Delete a transaction

🚀 Features Coming Soon
  User Authentication (JWT)
  
  Admin Authentication & RBAC
  
  Expense summary dashboard (charts & reports)
  
  Multi-user support with roles (Admin, Regular User)
  
  Search & Pagination
