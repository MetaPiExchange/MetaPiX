module.exports = {
  apps: [
    {
      name: 'MetaPiX-Backend',
      script: 'build/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'development',
        PORT: 8000,
        MONGODB_URI: 'mongodb://demoapp:dev_password@mongo:27017/demoapp-development?authSource=admin',
        SESSION_SECRET: 'S3cureMetaPiXKey2025!@#$', // Replace this later with .env reference if using dotenv
        PI_API_KEY: 'frqkee341nb6fdfgtisdywi90ul2cvsxlv9tjaotleaqjm05ienpodtwuwgqewew',
        FRONTEND_URL: 'https://metapiexchange.github.io/MetaPiX/',
      },
    },
  ],
};
