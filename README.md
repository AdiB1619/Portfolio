# Premium Developer Portfolio Website

## 1. Project Overview
A high-end, professionally designed personal portfolio website built for virtual internship submission. This project is a comprehensive showcase of modern web development practices, focusing on high-performance animations, premium UI/UX aesthetics, and authentic engineering identity.

## 2. Tech Stack
- **React.js**: Component-based UI architecture.
- **Tailwind CSS**: Utility-first styling for rapid and consistent design.
- **Framer Motion**: Complex physics-based animations, 3D tilts, and smooth transitions.
- **JavaScript**: Core application logic.
- **Vite**: Ultra-fast frontend build tooling and development server.

## 3. Features
- **Responsive Design**: Flawless execution across desktop, tablet, and mobile breakpoints.
- **Dark Premium Theme**: Deep purple and black aesthetic inspired by top-tier SaaS products (e.g., Stripe, Vercel, Linear).
- **Smooth Animations**: Intersecting scroll reveals, magnetic buttons, and 3D floating cards.
- **Project Showcase**: Detailed presentation of past academic and software projects.
- **Resume Integration**: Direct linking to professional documents and social profiles.
- **Contact Section**: Interactive form for direct communication and recruitment.
- **Premium UI**: Glassmorphism, subtle gradients, noise textures, and micro-interactions.

## 4. Installation

To run this project locally, clone the repository and navigate to the `frontend` directory:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 5. Purpose
Created as an internship submission project to actively demonstrate strong frontend development capabilities, UI engineering skills, modern tooling familiarity, and a deep understanding of component-driven architecture.

## 6. Author
**Aditya Bachute**  
Computer Engineering Student | Java Backend Developer  
- [GitHub](https://github.com/AdiB1619)
- [LinkedIn](https://www.linkedin.com/in/aditya-bachute-680570302)
- [Email](mailto:adityabachute@gmail.com)

## 7. Repository Structure

This project operates as a monorepo containing both the frontend portfolio and a backend service.

```text
/
├── frontend/                 # React + Vite application (Portfolio UI)
│   ├── src/                  
│   │   ├── components/       # Reusable UI components (Hero, About, Projects, etc.)
│   │   ├── pages/            # Main application views and layouts
│   │   ├── context/          # React context providers for state management
│   │   ├── utils/            # Helper functions and utilities
│   │   ├── index.css         # Global Tailwind styles and custom CSS variables
│   │   └── App.jsx           # Root application component
│   ├── public/               # Static assets (favicon, images)
│   ├── package.json          # Frontend dependencies and scripts
│   └── vite.config.js        # Vite configuration
│
└── backend/                  # Node.js + Express API server (Backend Logic)
    ├── src/
    │   ├── models/           # Mongoose schemas for MongoDB
    │   ├── routes/           # Express API endpoints
    │   ├── middleware/       # Custom middleware (auth, rate-limiting)
    │   └── controllers/      # Route logic and handlers
    ├── server.js             # Entry point for the backend server
    └── package.json          # Backend dependencies
```
