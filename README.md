# 🚀 Productivity Tracker

A premium, full-stack productivity monitoring application designed to help users track their tasks, analyze focus levels, and visualize their progress with stunning data visualizations.

![Productivity Tracker Preview](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop)

## ✨ Key Features

- **🔐 Secure Authentication**: Full JWT-based authentication system with secure password hashing.
- **📝 Activity Logging**: Sophisticated form to log tasks, categories, and focus levels (1-5 stars).
- **📊 Dynamic Analytics**: Interactive charts powered by Recharts to visualize productivity trends over time.
- **⚡ Real-time Updates**: Instant feedback and seamless navigation using Framer Motion animations.
- **🎨 Glassmorphic UI**: High-end modern design using Tailwind CSS with glassmorphism and subtle micro-animations.
- **☁️ Cloud Persistence**: Data stored securely in MongoDB with a robust Express backend.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JSON Web Tokens (JWT) & Bcrypt

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Atlas or Local)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ramsha1554/productivity-tracker.git
   cd productivity-tracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file based on `.env.example`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
   Start the server:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file based on `.env.example`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
   Start the development server:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```text
productivity-tracker/
├── backend/            # Express.js Server
│   ├── models/         # Mongoose Schemas
│   ├── routes/         # API Endpoints
│   ├── middleware/     # Auth & Error Handlers
│   └── server.js       # Entry point
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI Components
│   │   ├── pages/      # View Components
│   │   ├── context/    # State Management (Auth)
│   │   └── App.jsx     # Routing & Main Entry
│   └── tailwind.config.js
└── README.md
```

## 📄 License

This project is licensed under the ISC License.

---

Built with 💙 for better productivity.
