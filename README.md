# auth-app (Expo + NestJS + MongoDB)

Cross-platform app (Web / iOS / Android) with a simple auth flow:
- Login screen
- Home screen with **Delete Account** (soft delete / deactivate)

Frontend built with **Expo Router** + **NativeWind**.  
Backend built with **NestJS** + **MongoDB (Mongoose)**.

---

## Features

### Frontend
- Login form (username + password)
- Shows alert on invalid credentials / inactive user
- Navigates to home on success
- "Delete Account" button calls backend and returns to login

### Backend
- MongoDB connection
- User model:
  - `username` (unique)
  - `password` (plain text for the assignment)
  - `isActive` (default true)
  - `createdAt`
  - `deactivatedAt` (set on soft delete)
- Seeds demo users on startup (idempotent)
- Endpoints:
  - `POST /auth/login`
  - `PATCH /users/:id/deactivate` (soft delete)

---

## Tech Stack

**Frontend**
- Expo (React Native)
- expo-router
- NativeWind
- class-variance-authority (where relevant)

**Backend**
- NestJS (TypeScript)
- MongoDB + Mongoose

---

## Demo Users

Seeded automatically on backend startup:
-
- `adir` / `123456`

> After deactivation, the user becomes inactive and login returns 403.

---

## API

### Login
`POST /auth/login`

Body:
```json
{ "username": "adir", "password": "123456" }
