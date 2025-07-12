# Teen Titans App

A modern Next.js application with authentication, MongoDB backend, and beautiful UI built with Tailwind CSS.

## Features

- **Next.js 13** with App Router
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** with secure HTTP-only cookies
- **Password Hashing** with bcryptjs
- **Responsive Design** with Tailwind CSS
- **User Registration & Login**
- **Protected Dashboard**
- **Modern UI/UX**

## Tech Stack

- **Frontend**: Next.js 13, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 16+ 
- MongoDB (local or cloud)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd The_Teen_Titans
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/teen-titans-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or use a cloud MongoDB instance.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
The_Teen_Titans/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── dashboard/         # Protected dashboard page
│   ├── login/            # Login page
│   ├── signup/           # Signup page
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   └── page.js           # Homepage
├── lib/                   # Utility functions
│   └── mongodb.js        # MongoDB connection
├── models/               # Database models
│   └── User.js           # User model
├── package.json          # Dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── postcss.config.js     # PostCSS configuration
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

## Pages

- **Homepage** (`/`) - Landing page with features overview
- **Login** (`/login`) - User authentication form
- **Signup** (`/signup`) - User registration form
- **Dashboard** (`/dashboard`) - Protected user dashboard

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Setup

The application uses MongoDB with Mongoose. Make sure to:

1. Install MongoDB locally or use MongoDB Atlas
2. Set the `MONGODB_URI` environment variable
3. The database and collections will be created automatically

### Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing

## Security Features

- Password hashing with bcryptjs
- JWT tokens stored in HTTP-only cookies
- Input validation and sanitization
- Secure cookie settings
- CORS protection

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

3. Set up environment variables in your production environment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
