import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';

import routes from './routes';
import userRoutes from './users'; // If this is an Express router
import environments from './environments';
import { errorHandler } from './middlewares/errorHandler';

const app = express(); // ✅ Declare `app` before using it

// CORS configuration
app.use(cors({
  origin: environments.app.frontendUrl,
  credentials: true,
}));

// JSON parsing middleware
app.use(express.json());

// Session configuration
app.use(session({
  secret: environments.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // Set to true if using HTTPS in production
}));

// Connect to MongoDB
mongoose.connect(environments.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any)
  .then(() => console.log(`✅ Connected to MongoDB on: ${environments.mongo.uri}`))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Setup routes
app.use('/', routes);
app.use('/api', userRoutes); // ✅ Safe to call after `app` is declared

// Global error handler (must come last)
app.use(errorHandler);

// Start server
app.listen(environments.app.port, () => {
  console.log(`🚀 ${environments.app.name} - Backend listening on port ${environments.app.port}`);
  console.log(`🌐 CORS config: responding to ${environments.app.frontendUrl}`);
});
