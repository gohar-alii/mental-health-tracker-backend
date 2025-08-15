# Mental Health Tracker - Backend API

A robust Node.js backend API server for the Mental Health Tracker application. Built with Express.js, PostgreSQL, and Sequelize ORM, providing RESTful API endpoints and real-time WebSocket functionality for tracking and managing mental health data.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-316192?logo=postgresql)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8.1-010101?logo=socket.io)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Authentication](#-authentication)
- [Database Schema](#-database-schema)
- [WebSocket Events](#-websocket-events)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [License](#-license)

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure token management
- **Google OAuth 2.0 integration** for seamless social login
- **Passport.js** strategies for authentication
- **Protected routes** with JWT verification middleware
- **Token refresh** functionality

### 📊 Data Management
- **RESTful API** for mental health log operations
- **PostgreSQL database** with Sequelize ORM
- **User and Log models** with proper associations
- **Data validation** and error handling
- **Pagination and filtering** for log queries

### 🔄 Real-time Features
- **WebSocket integration** with Socket.IO
- **Real-time log updates** broadcast to connected clients
- **User-specific subscriptions** for personalized updates
- **Connection management** and error recovery

### 🛡️ Security & Best Practices
- **Input validation** for all endpoints
- **Error handling middleware** for consistent error responses
- **CORS configuration** for secure cross-origin requests
- **Environment-based configuration** for different deployment stages
- **SQL injection protection** via Sequelize ORM

## 🏗️ Tech Stack

### Core Framework
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework
- **PostgreSQL** - Relational database system

### Database & ORM
- **Sequelize 6.37.7** - Promise-based Node.js ORM
- **pg 8.14.1** - PostgreSQL client for Node.js
- **pg-hstore 2.3.4** - Serialization library for hstore data type

### Authentication
- **Passport.js 0.7.0** - Authentication middleware
- **passport-google-oauth20 2.0.0** - Google OAuth 2.0 strategy
- **passport-jwt 4.0.1** - JWT authentication strategy
- **jsonwebtoken 9.0.2** - JWT token generation and verification

### Real-time Communication
- **Socket.IO 4.8.1** - Real-time bidirectional event-based communication

### Utilities
- **dotenv 16.4.7** - Environment variable management
- **cors 2.8.5** - Cross-Origin Resource Sharing middleware
- **body-parser 2.2.0** - Request body parsing middleware
- **axios 1.8.4** - HTTP client library

### Development Tools
- **nodemon 3.1.9** - Development server with auto-reload
- **prettier 3.5.3** - Code formatter

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gohar-alii/mental-health-tracker-backend.git
   cd mental-health-tracker-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**
   ```sql
   CREATE DATABASE mental_health_tracker;
   ```

4. **Configure environment variables**
   Copy `env-sample` to `.env` and fill in your values:
   ```bash
   cp env-sample .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DB_USER=your_postgres_username
   DB_PASSWORD=your_postgres_password
   DB_NAME=mental_health_tracker
   DB_HOST=localhost
   DB_PORT=5432
   DB_SSL=false
   
   JWT_SECRET=your_jwt_secret_here
   
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
   
   FRONTEND_URL=http://localhost:3000
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`

## 📁 Project Structure

```
mental-health-tracker-backend/
├── config/
│   ├── config.js          # Database configuration
│   └── passport.js        # Passport.js authentication strategies
├── controllers/
│   ├── authController.js  # Authentication logic
│   └── logController.js   # Log CRUD operations
├── models/
│   ├── index.js           # Sequelize initialization and associations
│   ├── user.js            # User model definition
│   └── log.js             # Log model definition
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── logRoutes.js       # Log routes
│   └── index.js           # Main router
├── services/
│   ├── authService.js     # Authentication service layer
│   ├── logService.js      # Log business logic
│   └── websocketService.js # WebSocket service
├── utils/
│   ├── errorHandler.js    # Error handling middleware
│   └── validation.js      # Input validation utilities
├── server.js              # Express server setup
├── package.json           # Dependencies and scripts
├── env-sample             # Environment variables template
└── README.md              # Project documentation
```

## 🔌 API Endpoints

### Authentication

#### `GET /api/auth/google`
Initiates Google OAuth authentication flow.

#### `GET /api/auth/google/callback`
Google OAuth callback endpoint.

#### `GET /api/auth/me`
Get current authenticated user information.

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "id": 1,
  "googleId": "123456789",
  "email": "user@example.com",
  "name": "John Doe",
  "picture": "https://..."
}
```

### Logs

#### `POST /api/logs`
Create a new daily log entry.

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Body:**
```json
{
  "date": "2025-07-15",
  "moodRating": 4,
  "anxietyLevel": 2,
  "sleepHours": 7.5,
  "sleepQuality": 4,
  "sleepDisturbances": "None",
  "physicalActivityType": "Running",
  "physicalActivityDuration": 30,
  "socialInteractions": 3,
  "stressLevel": 2,
  "depressionSymptoms": "None",
  "anxietySymptoms": "Mild",
  "notes": "Feeling good today"
}
```

#### `GET /api/logs`
Get user's log entries with optional filtering.

**Query Parameters:**
- `date` - Filter by specific date (YYYY-MM-DD)
- `period` - Filter by time period (week, month)
- `limit` - Limit number of results

#### `PUT /api/logs/:id`
Update an existing log entry.

#### `DELETE /api/logs/:id`
Delete a log entry.

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication combined with Google OAuth.

### Authentication Flow

1. User initiates login via `/api/auth/google`
2. User authenticates with Google
3. Server receives callback with user info
4. Server creates/finds user in database
5. Server generates JWT token
6. Token is returned to frontend
7. Frontend includes token in `Authorization` header for protected routes

### Protected Routes

All log endpoints require authentication. Include the JWT token in the request header:

```
Authorization: Bearer <your_jwt_token>
```

## 💾 Database Schema

### User Model
- `id` (Primary Key)
- `googleId` (Unique)
- `email`
- `name`
- `picture`
- `createdAt`
- `updatedAt`

### Log Model
- `id` (Primary Key)
- `userId` (Foreign Key → User)
- `date`
- `moodRating` (1-5)
- `anxietyLevel` (1-5)
- `sleepHours`
- `sleepQuality` (1-5)
- `sleepDisturbances`
- `physicalActivityType`
- `physicalActivityDuration`
- `socialInteractions` (0-5)
- `stressLevel` (1-5)
- `depressionSymptoms`
- `anxietySymptoms`
- `notes`
- `createdAt`
- `updatedAt`

## 🔄 WebSocket Events

### Server Events

#### `log:created`
Emitted when a new log is created.

#### `log:updated`
Emitted when a log is updated.

#### `log:deleted`
Emitted when a log is deleted.

### Client Events

#### `subscribe`
Subscribe to user-specific updates.

**Payload:**
```json
{
  "userId": 1
}
```

## ⚙️ Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_USER` | PostgreSQL username | Yes |
| `DB_PASSWORD` | PostgreSQL password | Yes |
| `DB_NAME` | Database name | Yes |
| `DB_HOST` | Database host | Yes |
| `DB_PORT` | Database port | Yes |
| `DB_SSL` | Enable SSL connection | No |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes |
| `GOOGLE_CALLBACK_URL` | OAuth callback URL | Yes |
| `FRONTEND_URL` | Frontend application URL | Yes |
| `PORT` | Server port | No (default: 5000) |
| `NODE_ENV` | Environment mode | No (default: development) |

## 🚀 Deployment

### Build for Production

1. Set `NODE_ENV=production` in `.env`
2. Ensure database is configured and accessible
3. Install dependencies:
   ```bash
   npm install --production
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Deployment Options

#### Heroku
1. Install Heroku CLI
2. Create Heroku app: `heroku create`
3. Set environment variables in Heroku dashboard
4. Deploy: `git push heroku main`

#### AWS EC2
1. Set up EC2 instance with Node.js and PostgreSQL
2. Clone repository
3. Configure environment variables
4. Use PM2 for process management: `pm2 start server.js`

#### Docker
1. Create Dockerfile
2. Build image: `docker build -t mental-health-backend .`
3. Run container: `docker run -p 5000:5000 mental-health-backend`

## 📝 License

This project is part of the Mental Health Tracker application suite.

## 👤 Author

**Gohar Ali**
- GitHub: [@gohar-alii](https://github.com/gohar-alii)
- Email: gorry445@gmail.com

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- Sequelize team for the powerful ORM
- Socket.IO for real-time capabilities
- All contributors and users of this application

---

**Note**: Make sure to keep your `.env` file secure and never commit it to version control. Use the `env-sample` file as a template for required environment variables.

