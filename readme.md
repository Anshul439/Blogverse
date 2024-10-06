# Blogverse

Blogverse is a full-featured MERN (MongoDB, Express, React, Node.js) stack Blog Application. It provides a platform for users to create, read, update, and delete blog posts, as well as interact with other users' content.

## Description

Blogverse is built using the following technologies:
- Frontend: React, Redux Toolkit, Tailwind CSS
- Backend: Node.js, Express, MongoDB with Mongoose
- Authentication: JSON Web Tokens (JWT)
- Additional Tools: Docker for containerization

Key features include user authentication, CRUD operations for blog posts, rich text editing, responsive design, and an admin dashboard for content moderation.

## Running the Application

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)
- Docker (optional, for containerization)

### Development Mode

1. Clone the repository and install dependencies:
   ```
   git clone https://github.com/yourusername/blogverse.git
   cd blogverse
   npm install
   cd client
   npm install
   ```

2. Start the backend server:
   ```
   npm run dev
   ```

3. In a separate terminal, start the frontend development server:
   ```
   cd client
   npm run dev
   ```

4. Access the application at `http://localhost:5173`

### Production Mode

To build and start the application for production:

```
npm run build
npm start
```

The application will be available at `http://localhost:3000`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the project's code style.

## License

This project is licensed under the ISC License.
