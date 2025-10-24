🌐 Portfolio Contact API & Frontend (React + Express.js + MongoDB)

This is a secure full-stack contact form built with:

- Backend: Express.js (Node.js + MongoDB + Validation + Rate Limiting)
- Frontend: React (with built-in Captcha, validation, and error handling)
- Database: MongoDB (local via Compass)

Built by Prasanta Bhattacharjee — Full-Stack Developer based in Toronto, Canada.
Email: prasanta.ovi@gmail.com

---

## 🚀 Features

- Secure form submission with backend + frontend validation
- Rate limiting and duplicate email prevention
- Captcha verification (math-based, no Google reCAPTCHA)
- Automatic sanitization (prevents HTML/script injection)
- MongoDB (Compass compatible) with timestamps
- Ready for deployment to Render, AWS, or GitHub Pages

---

## 🗂 Folder Structure

portfolio-contact-api/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ └── contactController.js
│ ├── models/
│ │ └── Contact.js
│ ├── routes/
│ │ └── contactRoutes.js
│ ├── .env
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ └── App.js
│ ├── public/
│ ├── package.json
│ └── README.md
│
├── .gitignore
├── README.md
└── contacts.json (optional: exported sample data)

---

## 🧩 1. Prerequisites

Before starting, make sure you have installed:

- Node.js (v18 or higher)
- MongoDB Compass
- Git

---

## ⚙️ 2. Clone the Repository

Open Command Prompt and run:

cd D:\Projects
git clone https://github.com/yourusername/portfolio-contact-api.git
cd portfolio-contact-api

---

## 🔧 3. Backend Setup

Step 1: Move into the backend folder
cd backend

Step 2: Install dependencies
npm install

Step 3: Create .env file in backend folder and add:
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/portfolio_db

Step 4: Start backend server
npm run dev

You should see:
✅ MongoDB connected
🚀 Server running on http://localhost:5000

---

## 💾 4. Database Setup using MongoDB Compass

1. Open MongoDB Compass
2. Connect using:
   mongodb://127.0.0.1:27017
3. Create a database named:
   portfolio_db
4. Create a collection:
   contacts
5. (Optional) Import sample data:
   - Click Contacts → Add Data → Import JSON
   - Select contacts.json from project folder

---

## 🧠 5. Frontend Setup

Step 1: Move into the frontend folder
cd ../frontend

Step 2: Install dependencies
npm install

Step 3: Run the frontend
npm start

Now open your browser and go to:
http://localhost:3000

---

## 🔒 6. Security Overview

- Rate limiting: 3 requests per minute per IP
- Token verification: Each request must include token "PRASANTA_PORTFOLIO_TOKEN_2025"
- Duplicate check: Same email can’t submit twice
- Sanitization: All input is trimmed & HTML removed
- Captcha: Simple math-based validation (no bots)

---

## 🧰 7. Commands Reference

npm install → Install dependencies
npm run dev → Start backend (nodemon)
npm start → Start frontend (React)
mongoexport → Export data
mongoimport → Import data

For MongoDB Compass users:

- To Export: Open contacts collection → Export Collection → JSON → Save
- To Import: Open contacts collection → Add Data → Import JSON → Select file

---

## 🧑‍💻 8. Author

Prasanta Bhattacharjee
Full-Stack Developer | Toronto, Canada
Email: prasanta.ovi@gmail.com
LinkedIn: https://linkedin.com/in/prasanta-bhattacharjee

---

## 🪄 9. License

This project is licensed under the MIT License.
You’re free to use, modify, and distribute it with attribution.

---

## ⭐ 10. Support

If you like this project, please give it a star on GitHub!
Contributions and pull requests are always welcome.
