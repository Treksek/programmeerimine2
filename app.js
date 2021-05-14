const express = require('express');
const {
  ainedRoutes,
  kursusedRoutes,
  oppejoudRoutes,
  ruumidRoutes,
  usersRoutes,
} = require('./api/routes');
const { logger } = require('./api/middlewares');

const app = express();

// Middleware for creating req.body in express app
app.use(express.json());
// Logger middleware
app.use(logger);
// Routes
app.use('/ained', ainedRoutes);
app.use('/users', usersRoutes);
app.use('/kursused', kursusedRoutes);
app.use('/oppejoud', oppejoudRoutes);
app.use('/ruumid', ruumidRoutes);

module.exports = app;