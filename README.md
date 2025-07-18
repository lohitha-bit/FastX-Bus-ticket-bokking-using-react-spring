# 🚌 FastX - Online Bus Ticket Booking System
## CASE STUDY 
### Lohitha.L

Welcome to *FastX, a full-stack 🚀 web-based bus ticket booking application designed as part of a case study. This system allows users to search for bus routes, view schedules, book tickets, make secure payments, and manage bookings. The application includes features for users, bus operators, and administrators.

---

## 📌 Features

### 👥 For Users:
- User registration and login 🔐
- Search buses by origin, destination, and date 📍
- View available buses, amenities, and fare
- Select seats and book tickets 🧾
- Cancel bookings and view history 📜

### 🧑‍💼 For Bus Operators:
- Login and manage routes 🗺
- Add/Edit/Delete bus details
- View and manage booked tickets
- Process refunds for cancellations 💸

### 🛠 For Admin:
- Manage users and operators 👤
- Manage all bookings and routes 🗂
- Admin dashboard for oversight

---

## 🛠 Tech Stack

| Layer           | Technology                     |
|----------------|---------------------------------|
| Frontend        | React.js ⚛ + Semantic UI 🎨      |
| Backend         | Java + Spring Boot ☕           |
| Database        | MySQL 🐬                        |
| Authentication  | JSON Web Tokens (JWT) 🔐        |                  |
| Testing         | JUnit + Mockito 🧪              |

---

## 📁 Project Folder Structure

### 📦 Root Directory
```
fastx/
├── fastx-frontend/
├── fastx-backend/
└── README.md
```
---

### 🎨 Frontend – fastx-frontend/
```
fastx-frontend/
├── public/
├── src/
│ ├── components/
│ │ ├── common/ # Navbar, Footer, ProtectedRoute
│ │ ├── auth/ # Login, Register
│ │ ├── user/ # Dashboard, Booking, Payment
│ │ ├── busOperator/ # Route management
│ │ └── admin/ # Admin dashboard
│ ├── App.js
│ ├── index.js
│ └── App.css
```
---

### ☕ Backend – fastx-backend/
```
fastx-backend/
├── src/
│ ├── main/
│ │ └── java/com/hexaware/fastx/
│ │ ├── controller/
│ │ ├── dto/
│ │ ├── entity/
│ │ ├── exception/
│ │ ├── repository/
│ │ ├── security/ # JWT filters & config
│ │ ├── service/
│ │ ├── serviceImplementation/
│ │ └── FastxApplication.java
│ ├── test/ # JUnit + Mockito tests
│ │    └── EntityServiceTest.java
│ └── resources/
│ ├── application.properties
│ └── data.sql
```
---

## 🧪 Testing
- ✅ JUnit for unit testing service logic
- ✅ Mockito for mocking repository dependencies
- ✅ Separate tests for user, seat, route, and amenity services

---

## 🔐 Security
- JWT Authentication implemented for:
  - User roles: USER, BUS_OPERATOR, ADMIN
  - Secure protected routes
  - Token generation and validation
- Role-based access with @PreAuthorize

---

## 🧑‍💻 Getting Started

### 🚀 Backend (Spring Boot)
1. Open in *Spring Tool Suite (STS)* or IntelliJ
2. Configure your DB in application.properties
3. Run FastxApplication.java

### 🌐 Frontend (React)
1. Navigate to fastx-frontend/
2. Install dependencies  
npm install

Lohitha.L

---
