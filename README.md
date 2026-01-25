Video Games REST API

This project is a RESTful API for managing and providing information about video games. It is built with Node.js and Express, follows the MVC (Model–View–Controller) architecture, and uses MongoDB as a data store.

The API supports full CRUD operations for video games, user authentication and authorization using JSON Web Tokens (JWT), and aggregation endpoints for statistical and grouped data.

Features

RESTful API design

MVC architecture

MongoDB & Mongoose integration

User authentication with JWT

Role-based authorization (admin / user)

Data validation at schema level

Aggregate endpoints (statistics, grouping)

Filtering, sorting, field limiting and pagination

Basic security middleware (Helmet, Rate Limiting, HPP)

Tech Stack

Node.js

Express.js

MongoDB (MongoDB Atlas)

Mongoose

JSON Web Tokens (JWT)

bcryptjs

Helmet

express-rate-limit

hpp

Project Structure
├── controllers/
├── models/
├── routes/
├── utils/
├── dev-data/
├── app.js
├── server.js


models: Mongoose schemas and models

controllers: Request handling logic

routes: API endpoints

utils: Error handling and helper utilities

dev-data: Dataset and data import scripts

Installation

Clone the repository:

git clone https://github.com/vitsifunk/videogames-api.git


Install dependencies:

npm install


Create a config.env file:

PORT=8000
DATABASE=<MongoDB connection string>
JWT_SECRET=<your_secret>
JWT_EXPIRES_IN=90d
NODE_ENV=development


Start the server:

npm run dev

Data Import

Initial game data is imported from a JSON dataset using a standalone script.

Import data:

npm run import:data


Delete data:

npm run delete:data

API Endpoints
Games

GET /api/v1/games

GET /api/v1/games/:id

POST /api/v1/games (admin)

PATCH /api/v1/games/:id (admin)

DELETE /api/v1/games/:id (admin)

Aggregation

GET /api/v1/games/top-5

GET /api/v1/games/stats

GET /api/v1/games/by-year

GET /api/v1/games/by-company

Users

POST /api/v1/users/signup

POST /api/v1/users/login

GET /api/v1/users (admin)

GET /api/v1/users/:id (admin)

GET /api/v1/users/delete/:id (admin)

PATCH /api/v1/users/updateMe

DELETE /api/v1/users/deleteMe

Authentication & Authorization

Authentication is handled using JSON Web Tokens (JWT). Protected endpoints require a valid token to be provided in the Authorization header using the Bearer scheme.

Role-based access control is implemented to restrict certain operations (such as creating or deleting games) to admin users only.

API Testing

All endpoints were tested using Postman, covering:

Authentication and authorization flows

CRUD operations

Aggregate queries

Pagination and sorting

Error handling (401, 403, 404)

Summary

This project demonstrates a clean and scalable REST API implementation using modern Node.js practices. It focuses on maintainability, security, and structured data access, making it suitable both for academic purposes and as a portfolio project.
