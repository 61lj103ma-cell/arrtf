# FlowPilot AI — Full-Stack Starter

A futuristic AI workspace with:
- Responsive multi-page frontend
- Node.js + Express backend
- MongoDB + Mongoose
- JWT authentication
- Password hashing with bcrypt
- Protected user/project APIs
- Demo AI endpoint
- Dashboard with projects and activity

## 1. Requirements
- Node.js 18+
- MongoDB local installation OR a MongoDB Atlas connection string

## 2. Install
```bash
npm install
```

Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.

## 3. Run
```bash
npm run dev
```

Open:
http://localhost:5000

## 4. API
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
GET  /api/projects
POST /api/projects
DELETE /api/projects/:id
POST /api/ai/chat
GET  /api/health

The frontend is served by Express from `/frontend`.
