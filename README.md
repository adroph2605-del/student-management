# EduTrack SMS — Student Management System

**Professional Full-Stack MVP**  
Auspify Full Stack Development Internship — Task 2

Enterprise-style Student Information System inspired by platforms like PowerSchool and Canvas LMS. Built with clean architecture, role-based access, and portfolio-ready UI/UX.

**Live demo:** https://student-management-roan-seven.vercel.app/

---

## Tech Stack

| Layer        | Technology                                      |
| ------------ | ----------------------------------------------- |
| Frontend     | React 18 + Vite + Tailwind CSS                  |
| Routing      | React Router DOM                                |
| HTTP         | Axios                                           |
| Icons        | Lucide React                                    |
| i18n         | Custom ENG / SW (ThemeContext)                  |
| Backend      | Node.js + Express.js                            |
| Database     | MongoDB Atlas                                   |
| ODM          | Mongoose                                        |
| Auth         | JWT + bcryptjs                                  |
| Roles (RBAC) | `admin` · `faculty` · `student`                 |

---

## Features

### Public
- Landing page (hero, features, Solutions hub, CTA)
- ENG / SW language switch
- Light / Dark mode
- Auth pages: Register, Login, Forgot Password
- Role-based registration fields (Admin / Faculty / Student)

### Faculty (`/app`)
- Dashboard (stats, schedule, interventions)
- Students directory (search, filters, pagination)
- Student profile (academic, attendance, guardians, fees)
- Enrollment form
- Attendance register
- Gradebook
- Fees & payments overview
- Reports

### Student (`/student`)
- Personal dashboard (GPA, attendance, fee balance)
- Timetable / grades / attendance / fees / courses / profile / notices

### System Admin (`/admin`)
- System overview (users, campuses, revenue)
- Modules: Users, RBAC, Audit, LMS & API, Communications, Branding

### Backend API
- JWT authentication & role guards
- Students CRUD + search / pagination
- Attendance (single + bulk)
- Grades
- Fees & payments
- Dashboard stats (faculty + admin)

---

## Project Structure

```text
student-management-system/
├── frontend/
│   ├── src/
│   │   ├── components/        # Layout, AuthLayout, UI helpers
│   │   ├── context/           # ThemeContext, AuthContext
│   │   ├── data/              # mockData (fallback / demo)
│   │   ├── i18n/              # en.js, sw.js
│   │   ├── layouts/           # AdminLayout, StudentLayout
│   │   ├── pages/             # Landing, auth, faculty, admin, student
│   │   ├── services/          # Axios API layer
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/db.js
│   ├── middleware/            # auth (JWT + RBAC), errorHandler
│   ├── models/                # User, Student, Attendance, Grade, Fee
│   ├── routes/                # auth, students, attendance, grades, fees, dashboard
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── README.md