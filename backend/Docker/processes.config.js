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
        SESSION_SECRET: '', // Replace this later with .env reference if using dotenv
        PI_API_KEY: '',
        FRONTEND_URL: 'https://metapiexchange.github.io/MetaPiX/',
      },
    },
  ],
};
