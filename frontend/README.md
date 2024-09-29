# Course Subscription Application

This is a React application for managing course subscriptions. Users can view available courses, subscribe to courses, and view their subscribed courses. The application interacts with a backend API built using NestJS.

## Features

- View all available courses
- Subscribe to courses
- Unsubscribe from courses
- Add new courses (for admins or course creators)
- Delete courses (for admins or course creators)
- Drag-and-drop functionality for subscribing/unsubscribing courses

## Tech Stack

- **Frontend**: React (with TypeScript)
- **State Management**: React hooks
- **Styling**: Inline CSS styles
- **Backend**: API (NestJS) - separate project

## Setup and Installation

### Prerequisites

- **Node.js** (version 18.x or higher)
- **npm** (comes with Node.js)
- **API_URL**: You need to set up a backend API using [NestJS](https://nestjs.com/). The API URL should be configured in the `.env` file of the project.

### Install dependencies

1. Install all required dependencies:

   ```bash
    npm install
    ```

### Environment Variables
1. Create a .env file in the root of the project and add the following environment variables:
    ```dotenv
    VITE_API_URL=http://localhost:3001  # URL of your backend API
    ```

### Running the Application
1. To run the application locally, use the following command:
   ```bash
   npm run dev
    ```
This will start the development server, and you can access the application in your browser at http://localhost:3001.   

### File Structure
```
src/
│
├── components/            # React components like CourseCard, CourseList, etc.
├── hooks/                 # Custom React hooks for API interactions
├── api/                   # API service interacting with the backend
├── pages/                 # Page components for different routes
└── App.tsx                # Main application component
```
