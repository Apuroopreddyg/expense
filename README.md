<!-- 💰 Expense Tracker Admin Dashboard
This is an Admin Dashboard for managing users and their financial transactions. Built with Node.js, Express, MongoDB, and React-Bootstrap.

📚 Features
🔑 Admin can manage users (view & delete)

💸 Admin can view & delete all user transactions

🔄 Transactions are automatically deleted when a user is deleted

🛠 REST API using Express and MongoDB (Mongoose ODM)

💅 Fully responsive UI with Bootstrap tables and modals

🚀 Pagination-ready (optional)

🗑 Soft delete and hard delete options (can be extended)

🏗 Tech Stack
Frontend: React, React-Bootstrap, Axios

Backend: Node.js, Express.js

Database: MongoDB (Mongoose)

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
1. Clone the repo:
bash
Copy
Edit
git clone https://github.com/your-username/expense-tracker-admin.git
cd expense-tracker-admin
2. Install dependencies:
Backend:
bash
Copy
Edit
cd backend
npm install
Frontend:
bash
Copy
Edit
cd ../frontend
npm install
3. Configure environment variables:
Create a .env file inside /backend:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
PORT=5000
4. Run the project:
Backend:
bash
Copy
Edit
npm run dev
Frontend:
bash
Copy
Edit
npm start
🎯 API Endpoints
Method	Endpoint	Description
GET	/api/users	Get all users
DELETE	/api/users/:id	Delete a user and transactions
DELETE	/api/transactions/:id	Delete a transaction
✨ Screenshots
You can add screenshots of your UI here!

💡 Future Improvements
Add authentication & authorization

Add pagination and search

Add analytics/charts for transactions

Implement role-based access control (RBAC) -->