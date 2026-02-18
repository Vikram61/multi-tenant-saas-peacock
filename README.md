# 🦚 Multi-Tenant SaaS Platform

> A production-ready multi-tenant SaaS application built with React, Node.js, Express, and MongoDB.
> Includes authentication, role-based access control, invitation system, subscription plans, and organization-level isolation.

---

## 🚀 Live Demo

Frontend: https://multi-tenant-saas-peacock.vercel.app  
Backend API: https://multi-tenant-saas-peacock.onrender.com/api  

---

## 🧠 System Architecture

This application follows a **multi-tenant architecture** where:

- Each user belongs to one organization
- Data is isolated per organization
- Role-based permissions control actions
- Plan limits enforce SaaS constraints




Each API request is scoped by:

- `JWT Authentication`
- `Tenant Middleware`
- `Role Middleware`
- `Plan Middleware`

---

## 🏗 Tech Stack

### Frontend
- React (Vite)
- Context API
- Axios
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)
- Role-based middleware
- Multi-tenant isolation middleware

### Deployment
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 🔐 Authentication Flow

1. User signs up
2. Password is hashed using bcrypt
3. JWT access token issued
4. Token stored in localStorage
5. Axios interceptor attaches `Authorization: Bearer <token>`
6. `requireAuth` middleware validates user

---

## 🏢 Multi-Tenant Model

Each user document contains:

```js
{
  name,
  email,
  password,
  role,
  organization,
  tokenVersion
}

saas-frontend/
  ├── src/
  │   ├── api/
  │   ├── components/
  │   ├── context/
  │   ├── pages/
  │   └── utils/

saas-backend/
  ├── src/
  │   ├── controllers/
  │   ├── services/
  │   ├── middleware/
  │   ├── models/
  │   ├── routes/
  │   └── utils/
```

```bash
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_ACCESS_SECRET=your_secret_key
CLIENT_URL=https://multi-tenant-saas-peacock.vercel.app
VITE_API_URL=https://multi-tenant-saas-peacock.onrender.com/api

```
