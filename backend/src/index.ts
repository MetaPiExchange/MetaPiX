import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import routes from './routes';
import environments from './environments';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

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
  cookie: { secure: false }, // Use secure: true in production with HTTPS
}));

// Connect to MongoDB
mongoose.connect(environments.mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as any)
  .then(() => console.log(`Connected to MongoDB on: ${environments.mongo.uri}`))
  .catch((err) => console.error('MongoDB connection error:', err));

// Setup routes
app.use('/', routes);

// Global error handler (should be last)
app.use(errorHandler);

// Start server
app.listen(environments.app.port, () => {
  console.log(`${environments.app.name} - Backend listening on port ${environments.app.port}`);
  console.log(`CORS config: configured to respond to frontend hosted on ${environments.app.frontendUrl}`);
});
