module.exports = {
  apps: [
    {
      name: 'enlighten',
      script: './src/server.js',
      watch: true,
      env: {
        PORT: 8000,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 8000,
        NODE_ENV: 'production',
        JWT_KEY:
          'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4',
        DB_URI: 'mongodb://127.0.0.1:27017/enlighten',
        AWS_ACCESS_KEY_ID: 'AKIAIMYY6JKWQF254PUA',
        AWS_SECRET_ACCESS_KEY: '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',
        AWS_REGION: 'me-south-1',
      },
    },
  ],
};
