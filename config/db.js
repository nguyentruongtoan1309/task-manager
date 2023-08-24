module.exports = {
  name: process.env.DB_NAME,
  dialect: process.env.DB_TYPE,
  config: {
    server: process.env.DB_HOST,
    options: {
      port: parseInt(process.env.DB_PORT, 10) || 1433,
      trustServerCertificate: true,
    },
    authentication: {
      type: 'default',
      options: {
        userName: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD || 'Demoapinode#1',
      },
    },
  },
};
