AI Blog Application
Overview

The AI Blog Application is a modern web platform that allows users to generate, read, and manage AI-powered blog content. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), the application integrates AI functionalities to automatically generate blog content based on user prompts.

This application is ideal for bloggers, content creators, and businesses looking to create high-quality content efficiently.

Features
User Features

User Authentication: Secure registration and login using JWT tokens.

Blog Generation: Generate blog content automatically using AI.

Blog Management: Create, read, update, and delete blog posts.

Categories: Assign and filter blogs by categories.

Responsive UI: Fully responsive interface compatible with mobile and desktop devices.

Admin Features

User Management: View and manage registered users.

Blog Oversight: Manage all blogs, including moderation and deletion.

Technology Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT (JSON Web Tokens)

AI Integration: AI-powered blog generation (via API/Custom AI module)

Installation
Prerequisites

Node.js (v18+ recommended)

MongoDB (local or Atlas)

Steps

Clone the repository

git clone <your-repo-url>
cd AI-Blog-Application


Install backend dependencies

cd backend
npm install


Install frontend dependencies

cd ../frontend
npm install


Setup environment variables
Create a .env file in the backend folder:

PORT=4000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
AI_API_KEY=<your-ai-key-if-any>


Run the backend server

cd backend
npm run dev


Run the frontend server

cd frontend
npm run dev


Open your browser at http://localhost:5173 (or the port shown in the terminal)


Future Enhancements

Integration of advanced AI content optimization.

Real-time collaboration for multiple users.

Scheduled blog publishing.

Enhanced analytics and performance tracking for generated content.
