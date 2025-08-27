AI Blog Application 🚀




A modern AI-powered blog platform built with the MERN stack. Generate, read, and manage blog posts effortlessly with AI assistance.

🌟 Features

User Authentication: Secure signup & login using JWT.

AI Blog Generation: Create blogs automatically with AI.

CRUD Operations: Create, read, update, and delete posts.

Category Management: Organize and filter blogs by category.

Responsive UI: Mobile-first design with Tailwind CSS.

🖥️ Demo

Live Demo: [Insert Your Demo Link Here]

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT

AI Integration: AI-powered content generation

⚡ Installation
Prerequisites

Node.js v18+

MongoDB (local or Atlas)

Steps

Clone the repository

git clone <your-repo-url>
cd AI-Blog-Application


Backend setup

cd backend
npm install


Create .env:

PORT=4000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
AI_API_KEY=<your-ai-key-if-any>


Start backend:

npm run dev


Frontend setup

cd ../frontend
npm install
npm run dev


Open http://localhost:5173 in your browser.

📂 Folder Structure
AI-Blog-Application/
├── backend/          # Node + Express server
├── frontend/         # React frontend
└── README.md

🚀 Future Enhancements

Advanced AI content optimization.

Multi-user collaboration.

Scheduled publishing.

Analytics dashboard for generated content.

📝 License

This project is licensed under the MIT License.
