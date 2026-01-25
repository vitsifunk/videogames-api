🎮 Video Games RESTful API

A RESTful API developed with Node.js, Express.js, and MongoDB, designed for managing and providing information about video games.
The application follows the MVC (Model–View–Controller) architecture and supports authentication, authorization, CRUD operations, and advanced aggregation queries.

🚀 Technologies Used

Node.js

Express.js

MongoDB Atlas

Mongoose

JSON Web Tokens (JWT)

Postman (API testing)

Nodemon

Helmet / Morgan

📂 Project Structure (MVC)
videogames-api/
│
├── controllers/
│ ├── gameController.js
│ ├── userController.js
│ └── authController.js
│
├── models/
│ ├── gameModel.js
│ └── userModel.js
│
├── routes/
│ ├── gameRoutes.js
│ └── userRoutes.js
│
├── utils/
│ ├── apiFeatures.js
│ ├── appError.js
│ └── catchAsync.js
│
├── dev-data/
│ └── import-dev-data.js
│
├── app.js
├── server.js
├── package.json
└── config.env

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/videogames-api.git
cd videogames-api

2️⃣ Install dependencies
npm install

3️⃣ Environment variables

Create a config.env file in the root directory:

NODE_ENV=development
PORT=8000
DATABASE=<your MongoDB Atlas connection string>
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=90d

⚠️ The config.env file is not included in the repository for security reasons.

▶️ Running the Application
Development mode
npm run dev

Production mode
npm start

Server runs at:

http://localhost:8000

🔐 Authentication & Authorization

Users can sign up and log in

Authentication is handled using JWT

Protected routes require a Bearer Token

Role-based authorization:

admin: create, update, delete games

user: read-only access

Example Authorization Header (Postman)
Authorization: Bearer <JWT_TOKEN>

📌 API Endpoints
👤 Users
Method Endpoint Description
POST /api/v1/users/signup Register a new user
POST /api/v1/users/login Login and get JWT
🎮 Games (CRUD)
Method Endpoint Access
GET /api/v1/games Public
GET /api/v1/games/:id Public
POST /api/v1/games Admin
PATCH /api/v1/games/:id Admin
DELETE /api/v1/games/:id Admin
📊 Aggregate & Advanced Endpoints
Endpoint Description
/api/v1/games/top-5 Top 5 games by rating
/api/v1/games/stats Rating & price statistics
/api/v1/games/by-company Games grouped by company
/api/v1/games/by-year Games grouped by release year
🔎 Advanced Query Features

The API supports:

Filtering

Sorting

Field limiting

Pagination

Example:
/api/v1/games?rating[gte]=8&sort=-rating,price&fields=title,price,rating&page=1&limit=5

🧪 Testing

All endpoints were tested using Postman

Screenshots of requests and responses are included in the project report

MongoDB collections were verified using MongoDB Compass / Atlas UI

🧠 Additional Features

Data validation using Mongoose

Indexes for performance optimization

Virtual fields (e.g. valueScore)

Centralized error handling

Secure HTTP headers and rate limiting

📌 Conclusion

This project demonstrates the development of a complete RESTful API with modern backend technologies, following best practices in architecture, security, and performance.
It provides a scalable and maintainable solution for managing video game data.
