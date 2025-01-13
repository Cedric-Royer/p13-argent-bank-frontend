# Argent Bank Frontend

This project is the frontend application for Argent Bank, a new bank startup. It allows users to log in, view their accounts, and manage their profile.

## Related Backend Project

This frontend works with the Argent Bank API, which can be found at: [Argent Bank API Repository](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API)

Please refer to the backend repository for instructions on setting up and running the API.

## Features

- User authentication
- Profile management
- Account overview

## Technologies Used

- React
- Vite
- Redux Toolkit
- Redux Persist
- React Router

## Installation

1. Clone this repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint to check code quality

## Configuration

Ensure the backend API is running on `http://localhost:3001`. If the backend URL is different, modify it in `src/services/authApi.js`.

## Project Structure

- `src/components`: Reusable React components
- `src/pages`: Main page components
- `src/services`: API services and business logic
- `src/store`: Redux store configuration and slices

## API

The application uses a RESTful API for user authentication and profile management. Key endpoints include:

- POST `/api/v1/user/login`: User authentication
- POST `/api/v1/user/signup`: New user registration
- POST `/api/v1/user/profile`: Fetch and update user profile
