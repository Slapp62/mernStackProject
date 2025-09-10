# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture

This is a MERN stack application with separate frontend and backend directories:

- **Backend**: Node.js/Express REST API with MongoDB database
- **Frontend**: React app built with Vite, TypeScript, Mantine UI, and Redux

### Backend Structure

- `controllers/`: Route handlers (main.js, usersController.js, cardsController.js)
- `services/`: Business logic layer (userService.js, cardsServices.js)
- `middleware/`: Authentication, validation, and logging middleware
- `validation/`: Joi schemas for request validation and Mongoose schemas for database
- `database/`: MongoDB connection utilities (local, Atlas, test environments)
- `config/`: Environment-specific configuration files
- `tests/`: Jest test files with setup
- `seeding/`: Database seeding utilities and sample data

### Frontend Structure

- `src/pages/`: Page components organized by feature (AdminControls/, EditProfilePage/, LoginPage/)
- `src/components/`: Reusable UI components (Navigation/, Buttons/, Modals/)
- `src/hooks/`: Custom React hooks for API calls and state management
- `src/store/`: Redux Toolkit store with slices (userSlice, cardSlice, searchSlice)
- `src/routing/`: React Router setup with route guards
- `src/validationRules/`: Joi validation schemas for forms

## Common Commands

### Backend Development
```bash
cd backend
npm run dev          # Start development server with nodemon
npm run start        # Start production server
npm test            # Run all Jest tests
npm run test:cards   # Run card-specific tests
npm run test:users   # Run user-specific tests
npm run test:watch   # Run tests in watch mode
npm run format       # Format code with prettier
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start Vite development server
npm run build        # Build for production (includes TypeScript check)
npm run typecheck    # Run TypeScript compiler check
npm run lint         # Run ESLint and Stylelint
npm run prettier     # Check Prettier formatting
npm run vitest       # Run Vitest tests
npm test            # Full test suite (typecheck + prettier + lint + vitest + build)
```

## Key Technologies & Patterns

### Backend
- **Express.js** with modular route controllers
- **MongoDB** with Mongoose ODM
- **JWT authentication** with bcrypt password hashing
- **Joi validation** for request validation
- **Jest + Supertest** for testing
- **Morgan** for HTTP request logging
- **CORS** configured for frontend origins

### Frontend  
- **React 18** with TypeScript
- **Mantine UI** component library
- **Redux Toolkit** for state management with Redux Persist
- **React Router DOM** with route guards
- **Vite** build tool
- **Vitest** for testing with React Testing Library
- **Framer Motion** for animations

## Database Configuration

The backend uses MongoDB with multiple connection options:
- Local development: `mongodb://localhost:27017`
- Atlas cloud database (URI in environment config)
- Test database for Jest tests

Environment configuration is handled through `config/` directory with files for development, production, and test environments.

## Authentication & Authorization

- JWT tokens contain user ID, isBusiness status, and isAdmin status
- Route protection middleware validates tokens
- Business users can create/edit/delete cards
- Admin users have full system access
- Regular users can like cards and manage their profiles

## Testing Strategy

- Backend: Jest with Supertest for API endpoint testing
- Frontend: Vitest with React Testing Library for component testing
- Test setup files handle database connections and cleanup
- Separate test commands for different test suites