# MERN Stack Business Cards Platform

A full-stack web application for creating and managing business cards with user authentication, role-based permissions, and interactive features.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20App-blue)](https://reactMantineProject.onrender.com)
[![API Status](https://img.shields.io/badge/API-Online-green)](#api-endpoints)
[![License](https://img.shields.io/badge/License-Academic%20Use-orange)](#license)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This MERN stack application provides a comprehensive platform for business card management, featuring user authentication, role-based access control, and a modern responsive interface. Users can create accounts, manage business cards, and interact with cards through likes and favorites functionality.

### Live Demo
- **Frontend**: [https://reactMantineProject.onrender.com](https://reactMantineProject.onrender.com)
- **API Base URL**: Backend API endpoints available

## ✨ Features

### User Management
- 🔐 **Authentication System** - JWT-based login/registration
- 👥 **Role-Based Access** - Regular users, business users, and admins
- 📝 **Profile Management** - Edit user information and settings
- 🔄 **Account Type Switching** - Upgrade to business accounts

### Business Cards
- 📇 **Card Creation** - Business users can create detailed business cards
- ✏️ **Card Management** - Edit and delete owned cards
- ❤️ **Favorites System** - Like and save favorite cards
- 🔍 **Advanced Search** - Search by title, subtitle, or description
- 📊 **Sorting Options** - Sort by title (A-Z/Z-A) or date (newest/oldest)
- 📄 **Pagination** - Efficient browsing with 12 cards per page

### User Experience
- 🎨 **Modern UI** - Clean, responsive design with Mantine components
- 🌙 **Dark/Light Mode** - Theme switching capability
- 💫 **Smooth Animations** - Framer Motion powered transitions
- 📱 **Mobile Responsive** - Optimized for all device sizes
- ⚡ **Fast Performance** - Vite-powered frontend with optimized builds

### Admin Features
- 👑 **Admin Panel** - Dedicated administrative interface
- 👤 **User Management** - Promote/demote users and manage accounts
- 🗂️ **Content Oversight** - Full access to all cards and data

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Mantine UI** - Component library with accessibility features
- **Redux Toolkit** - State management with Redux Persist
- **React Router DOM** - Client-side routing with route guards
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API requests
- **Joi** - Client-side validation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Joi** - Server-side validation
- **Morgan** - HTTP request logging
- **CORS** - Cross-origin resource sharing

### Development & Testing
- **Jest** - Testing framework for backend
- **Supertest** - HTTP assertion testing
- **Vitest** - Frontend testing framework
- **React Testing Library** - Component testing utilities
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-restart

## 🏗️ Architecture

```
mernStackProject/
├── backend/                 # Node.js/Express API
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Auth, validation, logging
│   ├── services/           # Business logic
│   ├── database/           # MongoDB connection
│   ├── validation/         # Joi & Mongoose schemas
│   ├── tests/              # Jest test files
│   └── config/             # Environment configuration
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # Redux store & slices
│   │   ├── routing/        # Router configuration
│   │   └── validationRules/ # Form validation
│   └── public/             # Static assets
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (local installation or Atlas account)
- **Git**

### Environment Variables

Create `.env` files in both frontend and backend directories:

#### Backend `.env`
```env
NODE_ENV=development
PORT=3000
MONGO_LOCAL_URI=mongodb://localhost:27017/business-cards
MONGO_ATLAS_URI=your_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### Frontend `.env`
```env
VITE_API_URL=http://localhost:3000/api
```

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/mern-business-cards.git
cd mern-business-cards
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

### 4. Start Development Servers

#### Backend Server
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:3000`

#### Frontend Server
```bash
cd frontend
npm run dev
```
Application runs on `http://localhost:5173`

## 🎯 Usage

### User Registration & Authentication
1. Visit the application homepage
2. Click "Register" to create a new account
3. Choose between regular user or business account
4. Login with your credentials

### Business Card Management
1. **For Business Users**: Access "Create Card" from the navigation
2. Fill in business details (title, subtitle, description, contact info)
3. Submit to create your business card
4. Manage cards from "My Listings" section

### Discovering Cards
1. Browse all cards on the homepage
2. Use the search bar to find specific cards
3. Apply sorting filters (title, date)
4. Click heart icon to like/unlike cards
5. View detailed card information

## 📡 API Endpoints

### Authentication
```http
POST /api/users/register    # User registration
POST /api/users/login       # User login
GET  /api/users/profile/:id # Get user profile
PUT  /api/users/profile/:id # Update user profile
```

### Users Management
```http
GET    /api/users           # Get all users (admin only)
PATCH  /api/users/:id       # Update user status
DELETE /api/users/:id       # Delete user
```

### Business Cards
```http
GET    /api/cards           # Get all cards (public)
GET    /api/cards/:id       # Get specific card
GET    /api/cards/my-cards  # Get user's cards (authenticated)
GET    /api/cards/liked     # Get user's liked cards
POST   /api/cards           # Create new card (business users)
PUT    /api/cards/:id       # Update card (owner/admin)
DELETE /api/cards/:id       # Delete card (owner/admin)
PATCH  /api/cards/:id/like  # Toggle card like status
```

### Request/Response Examples

#### Create Business Card
```http
POST /api/cards
Content-Type: application/json
Authorization: Bearer <jwt-token>

{
  "title": "John's Tech Solutions",
  "subtitle": "Full-Stack Development",
  "description": "Professional web development services",
  "phone": "+1-555-0123",
  "email": "john@techsolutions.com",
  "web": "https://johntechsolutions.com",
  "image": {
    "url": "https://example.com/image.jpg",
    "alt": "Company logo"
  },
  "address": {
    "state": "California",
    "country": "USA",
    "city": "San Francisco",
    "street": "123 Tech Street",
    "houseNumber": 456,
    "zip": 94105
  }
}
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:cards         # Run card tests only
npm run test:users         # Run user tests only
npm run test:watch         # Run tests in watch mode
```

### Frontend Tests
```bash
cd frontend
npm run vitest             # Run Vitest tests
npm run vitest:watch       # Run tests in watch mode
npm test                   # Full test suite (includes linting, typecheck)
```

### Code Quality
```bash
# Backend
npm run format             # Format with Prettier
npm run format:check       # Check formatting

# Frontend  
npm run lint               # Run ESLint and Stylelint
npm run prettier           # Check Prettier formatting
npm run typecheck          # TypeScript compilation check
```

## 🚀 Deployment

### Frontend Deployment (Render)
1. Connect your GitHub repository to Render
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Backend Deployment
1. Set up MongoDB Atlas database
2. Configure environment variables for production
3. Deploy to your preferred hosting platform (Render, Heroku, etc.)
4. Update CORS origins for production frontend URL

### Production Environment Variables
```env
NODE_ENV=production
MONGO_ATLAS_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Write tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is for **academic purposes only** and is not intended for production use.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Mantine](https://mantine.dev/) - UI component library
- [Vite](https://vitejs.dev/) - Build tool
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management

---

**Developed by Elazar Lapp** | [Portfolio](https://reactMantineProject.onrender.com) | [Contact](#)