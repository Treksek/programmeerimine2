//const express = require('express');
const config = require('./config');
const app = require('./app');

/*const ainedRoutes = require('./api/routes/ainedRoutes');
const kursusedRoutes = require('./api/routes/kursusedRoutes');
const oppejoudRoutes = require('./api/routes/oppejoudRoutes');
const ruumidRoutes = require('./api/routes/ruumidRoutes');
const usersRoutes = require('./api/routes/usersRoutes');

const { logger } = require('./api/middlewares');

const app = express();*/
const { port } = config || 4000;

/*// Middleware for creating req.body in express app
app.use(express.json());
// Logger middleware
app.use(logger);
// Routes
app.use('/ained', ainedRoutes);
app.use('/kursused', kursusedRoutes);
app.use('/oppejoud', oppejoudRoutes);
app.use('/ruumid', ruumidRoutes);
app.use('/users', usersRoutes);*/



// Start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
