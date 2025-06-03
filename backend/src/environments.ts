const environments = {
  app: {
    name: 'MetaPiX',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    frontendUrl: process.env.FRONTEND_URL || 'https://metapiexchange.github.io/MetaPiX/',
  },
  pi: {
    apiKey: process.env.PI_API_KEY || '',
  },
  session: {
    secret: process.env.SESSION_SECRET || '',
  },
  mongo: {
    uri:
      process.env.MONGODB_URI ||
      'mongodb://demoapp:dev_password@localhost:27017/demoapp-development?authSource=admin',
  },
};

export default environments;
