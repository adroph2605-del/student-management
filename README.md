# EduTrack — Student Management System

**Professional Full-Stack MVP**  
Auspify Full Stack Development Internship — Task 2 (Easy)

A clean, modern Student Information System inspired by enterprise platforms like PowerSchool / EduTrack. Built with production-quality standards for portfolio use.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18 + Vite + Tailwind CSS v4   |
| Routing   | React Router DOM v6                 |
| HTTP      | Axios                               |
| Icons     | Lucide React                        |
| Toasts    | React Hot Toast                     |
| Backend   | Node.js + Express.js                |
| Database  | MongoDB (Atlas recommended)        |
| ODM       | Mongoose                            |

---

## Features

### Must-Have (Implemented in Frontend)
- Student List with search & status filter
- Add Student form (with validation)
- Edit Student form
- View Student details / profile
- Delete Student (with confirmation modal)
- Status: Active / Inactive / Graduated
- Responsive design (mobile + desktop)
- Loading states & Empty states
- Toast success / error messages
- Dashboard with stats overview

### Backend
- Full REST API for students
- MongoDB connection via Mongoose
- Student validation, duplicate-email handling, and proper error status codes

---

## Project Structure

```
student-management-system/
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Route pages
│   │   ├── services/          # API layer (Axios)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/                   # Express API
│   ├── models/
│   │   └── Student.js         # Mongoose schema
│   ├── routes/
│   │   └── students.js        # Student CRUD routes
│   ├── server.js              # Connect MongoDB & mount routes
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Add your MongoDB connection string to .env
```

Start the backend:

```bash
npm run dev
```

API will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

> The Vite config already proxies `/api` requests to `http://localhost:5000`.

---

## API Endpoints (to implement)

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/students`       | Get all students     |
| GET    | `/api/students/:id`   | Get one student      |
| POST   | `/api/students`       | Create student       |
| PUT    | `/api/students/:id`   | Update student       |
| DELETE | `/api/students/:id`   | Delete student       |

### Student Data Model

```js
{
  name: String,        // required
  email: String,       // required, unique
  course: String,
  age: Number,
  phone: String,
  status: String,      // "Active" | "Inactive" | "Graduated" (default: "Active")
  createdAt: Date,     // auto
  updatedAt: Date      // auto
}
```

---

## Design System

- **Primary**: Deep Emerald / Forest Green (`#0b3d2e`, `#047857`)
- **Background**: Clean white + light gray
- **Typography**: Inter
- **Style**: Modern SaaS dashboard (sidebar layout, cards, clean tables)
- Fully responsive (mobile sidebar drawer + desktop fixed sidebar)

---

## Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
```

### Backend
```bash
npm run dev      # Start with nodemon
npm start        # Start production
```

---

## Notes for Backend Implementation

1. Enable CORS
2. Use `express.json()` middleware
3. Return proper HTTP status codes (200, 201, 400, 404, 500)
4. Handle duplicate email errors gracefully
5. Use Mongoose `timestamps: true`
6. Validate required fields on the backend as well

---

## Author

Built as part of **Auspify Full Stack Development Internship — Task 2**

---

## License

MIT
