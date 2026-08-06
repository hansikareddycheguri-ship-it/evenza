# 🎉 Evenza – Event Booking System

Evenza is a full-stack Event Booking System built using the MERN stack. It allows users to browse events, book seats, manage their bookings, and securely authenticate using JWT.

---
## Live Demo

Frontend:
https://evenza-three.vercel.app

Backend API:
https://evenza-production-17ad.up.railway.app
## 🚀 Features

- 🔐 User Registration & Login
- 🔒 JWT Authentication
- 🛡️ Protected Routes
- 📅 Browse Available Events
- 🎟️ Book Events
- ❌ Cancel Bookings
- 📖 View My Bookings
- 🔍 Search Events
- 📄 Pagination
- 📱 Responsive Bootstrap UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- Bootstrap

### Backend
- Node.js
- Express.js
- JWT Authentication
- Bcrypt.js

### Database
- MongoDB Atlas
- Mongoose

---

## 📂 Project Structure

```
Evenza/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── client/
    └── Evenza/
        ├── src/
        ├── public/
        ├── package.json
        └── vite.config.js
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/hansikareddycheguri-ship-it/evenza.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd client/Evenza
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🌐 API Endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`

### Events

- GET `/api/events`
- GET `/api/events/:id`
- POST `/api/events`
- PUT `/api/events/:id`
- DELETE `/api/events/:id`

### Bookings

- POST `/api/bookings`
- GET `/api/bookings/my-bookings`
- DELETE `/api/bookings/:id`

---

## 📸 Screenshots

You can add screenshots of:

- Home Page
- Login
- Register
- Event Details
- My Bookings

---

## 👩‍💻 Author

**Hansika Reddy Cheguri**

B.Tech CSE, IIT Hyderabad

---

## 📄 License

This project is created for educational purposes.