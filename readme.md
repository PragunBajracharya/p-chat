# P Chat

P Chat is a real-time chat application built using **Vite**, **React**, **Node.js**, **Express**, **MongoDB**, and **Socket.io**. It allows users to communicate in real time with an interactive and responsive UI.

## Features
- **Real-time Messaging** using WebSockets (Socket.io)
- **User Authentication** (JWT-based authentication)
- **MongoDB Database** for user and message storage
- **React Frontend** powered by Vite for a fast development experience
- **REST API** with Express.js for backend operations

## Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **WebSockets:** Socket.io
- **Deployment:** Vercel (Frontend), Railway/Render (Backend)

---

## Installation & Setup
### 1️⃣ Backend Setup
```sh
cd backend
npm install
npm run start
```

### 2️⃣ Frontend Setup
```sh
cd frontend
npm install
npm run build  # To build the project
npm run dev    # To start the development server
```

---

## Environment Variables
Create a **.env** file in both **backend** and **frontend** directories.

### `.env`
```env
MONGODB_URI=test
PORT=5001
CLIENT_URL=http://localhost:3000
JWT_SECRET=secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=test
CLOUDINARY_API_KEY=test
CLOUDINARY_API_SECRET=test
```

---

## Running the App
1. **Start the backend**
   ```sh
   cd backend
   npm run start
   ```
2. **Start the frontend**
   ```sh
   cd frontend
   npm run dev
   ```

---

### Database Not Connecting?
- Double-check the **MONGODB_URI** in `.env`.
- Ensure MongoDB is running locally or the cloud database is accessible.

---

## License
This project is licensed under the **MIT License**.

---

Happy coding! 🚀

