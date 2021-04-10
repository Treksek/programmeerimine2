const config = {
    port: 4000,
    saltRounds: 10,
    jwtSecret: 'secret',
    db: {
      host: 'localhost',
      user: 'root',
      password: 'parool',
      database: 'tunniplaan',
    },
  };
  
  module.exports = config;