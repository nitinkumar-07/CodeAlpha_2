<div align="center">

# 💼 TalentHub - Full-Stack Job Portal

🚀 **TalentHub** is a production-ready, feature-rich Full-Stack Job Portal built using the **MERN Stack** (MongoDB, Express.js, React, Node.js). This project was engineered to create a seamless, robust, and scalable platform bridging the gap between talented job seekers and recruiters.

### 🚀 Live Demo
👉 https://job-portal-backend-tkdn.onrender.com/

</div>

---


## 📝📌 Project Overview

**TalentHub** is a modern, responsive full-stack web application designed to streamline the hiring workflow. The platform addresses the core needs of the modern job market by providing dual-role capabilities under a single integrated system. 

The application enables **Job Seekers** to seamlessly build profiles, explore real-time listings with smart multi-filtering, and track application progress on interactive dashboards. Simultaneously, it empowers **Recruiters** with an employer-focused control suite to register companies, manage job lifecycles (post, update, or archive openings), and review candidate applications efficiently. Optimized for production, the entire system utilizes robust REST APIs, global state hydration via Redux, and high-availability server setups to deliver an instantaneous, enterprise-grade user experience.

---

# ✨ Features

## 👨‍🎓 Student Module

- Secure Signup & Login
- JWT Authentication
- Protected Routes
- Update Profile
- Upload Resume (PDF)
- Upload Profile Photo
- Add Skills
- Bio Section
- Browse All Jobs
- Search Jobs
- Filter Jobs
- View Complete Job Details
- One Click Apply
- Track Applied Jobs
- View Application Status
- Responsive Dashboard

---

## 🏢 Recruiter Module

- Recruiter Authentication
- Company Registration
- Company Profile Management
- Upload Company Logo
- Create Job Posts
- Update Job Details
- Delete Jobs
- View Posted Jobs
- View Applicants
- Accept Applications
- Reject Applications
- Recruiter Dashboard

---

## 🔐 Authentication & Security

- JWT Authentication
- HTTP Only Cookies
- Password Hashing using bcrypt
- Protected APIs
- Role Based Authorization
- Input Validation
- Secure File Upload

---

## 📂 Resume & Image Upload

- Cloudinary Integration
- Resume Upload
- Profile Image Upload
- Company Logo Upload
- Optimized Media Storage

---

## 🔍 Job Search

- Search by Keyword
- Filter by Location
- Filter by Company
- Filter by Job Role
- Instant Search Results
- Responsive Job Cards

---

## 📊 Dashboard

### Student Dashboard

- Profile Overview
- Resume Preview
- Applied Jobs History
- Account Management

### Recruiter Dashboard

- Total Companies
- Posted Jobs
- Applicants List
- Company Management

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Shadcn UI
- Axios
- Lucide Icons

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary
- Cookie Parser
- CORS

---

---

---

## 📂 Folder Structure

The repository is structured into two main directories decoupling the client interface and server-side REST APIs:

```text
├── backend/
│   ├── controller/         # Core backend logic for users, jobs, and companies
│   ├── middleware/         # Custom authentication and route protection logics
│   ├── models/             # Mongoose schemas representing database collections
│   ├── routes/             # API endpoint route mappings
│   ├── utils/              # Server-side utility functions and helper methods
│   └── index.js            # Entry configuration point for the Node server
│
├── frontend/
│   ├── src/
│   │   ├── assets/         # Static images, icons, and media files
│   │   ├── components/     # UI layer broken into modular modules:
│   │   │   ├── adminCompo...  # Admin & recruiter control management interfaces
│   │   │   ├── authentication # Login, signup, and validation containers
│   │   │   └── component_lite  # Core portal views (Home, Browse, JobCards, AppliedJobs, FilterCard)
│   │   ├── hooks/          # Custom hooks handling asynchronous data workflows
│   │   ├── lib/            # External library custom wrappers and instantiations
│   │   ├── redux/          # Global application store slices and configurations
│   │   ├── utils/          # Client-side utility functions and formatting helpers
│   │   ├── App.css / App.jsx# Core design mappings and routing orchestrations
│   │   ├── index.css       # Tailwind base injection stylesheet
│   │   └── main.jsx        # App mounting and production environment bootstrap
│   ├── .gitignore          # Version control ignore lists
│   └── components.json     # Architectural UI setup registry config file
└── README.md               # Production architecture manual
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/job-portal.git
```

Move into project

```bash
cd job-portal
```

---

## Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=

MONGO_URI=

JWT_SECRET=

CLOUD_NAME=

CLOUD_API=

API_SECRET=

CLIENT_URL=
```

---

## Run Backend

```bash
npm run dev
```

---

## Run Frontend

```bash
npm run dev
```

---

# 📸 Screenshots

| Home | Jobs |
|------|------|
| Screenshot | Screenshot |

| Login | Profile |
|------|------|
| Screenshot | Screenshot |

| Recruiter Dashboard | Company Dashboard |
|------|------|
| Screenshot | Screenshot |

---

# 🎯 Major Functionalities

✅ User Authentication

✅ Recruiter Authentication

✅ Company Management

✅ Job Posting

✅ Job Editing

✅ Job Searching

✅ Job Filtering

✅ Resume Upload

✅ Profile Management

✅ Apply for Jobs

✅ Applicant Tracking

✅ Recruiter Dashboard

✅ Student Dashboard

✅ Protected Routes

✅ Responsive UI

---

# 💡 Future Improvements

- Email Notifications
- Forgot Password
- Google Authentication
- Bookmark Jobs
- Real-time Notifications
- Interview Scheduling
- Admin Panel
- AI Resume Analyzer
- AI Job Recommendation
- Chat Between Recruiter & Candidate

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork Repository

2. Create New Branch

```bash
git checkout -b feature-name
```

3. Commit Changes

```bash
git commit -m "Added Feature"
```

4. Push Branch

```bash
git push origin feature-name
```

5. Open Pull Request

---

# 👨‍💻 Author

**Nitin Kumar**

💼 MERN Stack Developer

GitHub:
https://github.com/nitinkumar-07

LinkedIn:
https://www.linkedin.com/in/nitin-kumar-491813336/

---

# ⭐ Support

If you like this project, don't forget to ⭐ the repository.

It motivates me to build more amazing projects.

---

<div align="center">

Made with ❤️ using MERN Stack

</div>
