# Blogverse

Blogverse is a full-featured MERN (MongoDB, Express, React, Node.js) stack Blog Application. It provides a platform for users to create, read, update, and delete blog posts, as well as interact with other users' content.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Technologies Used

- **Frontend**: 
  - React 18
  - React Router 6
  - Redux Toolkit for state management
  - Tailwind CSS for styling
  - Vite as the build tool
- **Backend**: 
  - Node.js
  - Express
  - MongoDB with Mongoose ORM
- **Authentication**: 
  - JSON Web Tokens (JWT)
  - bcrypt for password hashing
- **Additional Tools**:
  - Docker for containerization
  - Firebase (integration details to be specified)

## Features

- User authentication (sign up, login, logout)
- Create, read, update, and delete blog posts
- Rich text editing with React Quill
- Responsive design with Tailwind CSS
- User profiles with avatars
- Comment system for blog posts
- Search functionality for blog posts
- Pagination for blog post listings
- Tags and categories for blog posts
- Social media sharing options
- Admin dashboard for content moderation

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)
- Docker (optional, for containerization)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Anshul439/blogverse.git
   cd blogverse
   ```

2. Install backend dependencies:
   ```
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd client
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   NODE_ENV=development
   ```

2. Create a `.env` file in the `client` directory for any frontend-specific environment variables:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

## Running the Application

### Development Mode

1. Start the backend server:
   ```
   npm run dev
   ```

2. In a separate terminal, start the frontend development server:
   ```
   cd client
   npm run dev
   ```

3. Access the application at `http://localhost:5173`

### Production Mode

To build and start the application for production:

```
npm run build
npm start
```

This will install dependencies, build the frontend, and start the server. The application will be available at `http://localhost:3000`.

## Project Structure

```
blogverse/
├── api/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── tests/
├── .gitignore
├── package.json
└── README.md
```

## API Endpoints

- Authentication:
  - `POST /api/auth/signup`: Create a new user account
  - `POST /api/auth/login`: Log in to an existing account
  - `POST /api/auth/logout`: Log out the current user

- Blog Posts:
  - `GET /api/posts`: Retrieve all blog posts
  - `GET /api/posts/:id`: Retrieve a specific blog post
  - `POST /api/posts`: Create a new blog post
  - `PUT /api/posts/:id`: Update an existing blog post
  - `DELETE /api/posts/:id`: Delete a blog post

- Users:
  - `GET /api/users/:id`: Retrieve user profile
  - `PUT /api/users/:id`: Update user profile

- Comments:
  - `POST /api/posts/:id/comments`: Add a comment to a blog post
  - `DELETE /api/posts/:id/comments/:commentId`: Delete a comment

## Database Schema

- User:
  - username (String, required, unique)
  - email (String, required, unique)
  - password (String, required)
  - profilePicture (String)
  - bio (String)
  - createdAt (Date)
  - updatedAt (Date)

- Post:
  - title (String, required)
  - content (String, required)
  - author (ObjectId, ref: 'User')
  - tags (Array of Strings)
  - category (String)
  - createdAt (Date)
  - updatedAt (Date)

- Comment:
  - content (String, required)
  - author (ObjectId, ref: 'User')
  - post (ObjectId, ref: 'Post')
  - createdAt (Date)
  - updatedAt (Date)

## Testing

To run the test suite:

```
npm test
```

This will run both backend and frontend tests.

## Deployment

[Add instructions for deploying your application to a production environment, such as Heroku, AWS, or DigitalOcean]

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the project's code style.

## Troubleshooting

- If you encounter CORS issues during development, ensure that your backend CORS configuration matches the frontend's URL.
- For MongoDB connection issues, double-check your MONGO_URI in the `.env` file and ensure your IP address is whitelisted in MongoDB Atlas (if using a cloud-hosted database).
- If you face issues with dependencies, try deleting the `node_modules` folder and `package-lock.json` file, then run `npm install` again.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.