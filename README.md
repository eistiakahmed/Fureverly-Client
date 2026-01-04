# 🐶 **Fureverly**

[![Frontend Live](https://img.shields.io/badge/Frontend-Netlify-brightgreen)](https://fureverly.netlify.app/)
[![Backend Live](https://img.shields.io/badge/Backend-Vercel-blue)](https://fureverly-server.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

**Fureverly** is a **full-featured pet product management system** built with the **MERN stack**.  
Users and admins can manage products, handle orders, and export order details as PDF.  
The platform features a clean UI, theme switch, smooth animations, and a responsive experience.

---

## 📖 **Table of Contents**

- [Features](#features)
- [Tech Stack / Libraries](#tech-stack--libraries)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Run the Project](#run-the-project)
- [Live Demo](#live-demo)
- [Contact](#contact)

---

## ✨ **Features**

- **Product CRUD**: Add, edit, delete, and view products  
- **Order Management**: Place orders & download order details as **PDF**  
- **Theme Toggle**: Switch between **light & dark** modes  
- **Responsive UI**: Optimized for mobile, tablet & desktop  
- **Smooth Animations** using **Framer Motion**  
- **Alerts & Notifications** via Toast & SweetAlert  
- **Search & Filter** products by name or category  
- **Protected Routes** for Admin and User roles  

---

## 🛠️ **Tech Stack / Libraries**

- **Frontend**: React.js, Vite, TailwindCSS, DaisyUI  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Auth & Storage**: Firebase Authentication, Firebase Storage  
- **Routing**: React Router DOM  
- **Animations**: Framer Motion  
- **PDF Export**: jsPDF, jsPDF AutoTable  
- **Notifications**: React Hot Toast, SweetAlert2  
- **Icons**: React Icons, Lucide React  
- **Extras**: Typewriter, Spinners, Tooltip libraries  

---

## 🏗️ **Project Structure**

```text
FUREVERLY
│
├─ Backend/                 # Node.js + Express backend
│   ├─ .vercel/             # Deployment config (Vercel)
│   ├─ index.js             # Express Server + MongoDB CRUD
│   ├─ .env                 # Backend credentials (secure)
│   ├─ vercel.json          # Deployment configuration
│   └─ package.json
│
├─ Frontend/                # React + Vite frontend
│   ├─ public/              # Static resources
│   ├─ src/                 # Source code
│   │   ├─ assets/          # Images & icons
│   │   ├─ Components/      # Reusable UI components
│   │   ├─ Context/         # Global context
│   │   ├─ Firebase/        # Auth & storage setup
│   │   ├─ Layouts/         # Layout components
│   │   ├─ Pages/           # Application pages
│   │   ├─ Private/         # Protected routes
│   │   ├─ Routes/          # Routing setup
│   │   └─ main.jsx         # Entry file
│   ├─ .env                 # Firebase keys
│   └─ package.json
```

---

### 🔐 **Environment Setup**

```env
# MongoDB
DB_USER=your_mongodb_username
DB_PASSWORD=your_mongodb_password

# Firebase
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_project_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_firebase_app_id

# Backend
PORT=3000
```

---

### 📦 **Installation**

```bash
git clone https://github.com/eistiakahmed/Fureverly.git
cd Fureverly
npm install
```

---

## 📬 **Contact**

### **👤 Eistiak Ahmed**

🔗 **LinkedIn:** https://www.linkedin.com/in/eistiak-ahmed-meraj  
📩 **Email:** eistiakahmedmeraj@gmail.com  

---



### 💻 Project Repository & Live Demo

**🔗 Live URL:** [Fureverly](https://fureverly.netlify.app/)
* **Fureverly Frontend:** [https://github.com/eistiakahmed/Fureverly.git](https://github.com/eistiakahmed/Fureverly.git)
* **Fureverly Backend:** [https://fureverly-server.vercel.app/](https://fureverly-server.vercel.app/)
