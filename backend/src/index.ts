import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';

import routes from './routes';
import environments from './environments';
import { errorHandler } from './middlewares/errorHandler';
import userRoutes from './users'; // Make sure users.ts exports an Express router

const app = express();

// ✅ CORS configuration
app.use(cors({
  origin: environments.app.frontendUrl,
  credentials: true,
}));

// ✅ JSON parsing middleware
app.use(express.json());

// ✅ Session configuration
app.use(session({
  secret: environments.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // set to true in production with HTTPS
}));

// ✅ Connect to MongoDB
mongoose.connect(environments.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any)
  .then(() => console.log(`✅ Connected to MongoDB on: ${environments.mongo.uri}`))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Mount routes
app.use('/', routes); // For general/demo routes
app.use('/api', userRoutes); // For user-related API routes

// ✅ Global error handler (must be last)
app.use(errorHandler);

// ✅ Start the server
app.listen(environments.app.port, () => {
  console.log(`🚀 ${environments.app.name} - Backend listening on port ${environments.app.port}`);
  console.log(`🌐 CORS config: responding to frontend hosted on ${environments.app.frontendUrl}`);
});
