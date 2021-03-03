const express = require('express');
const config = require('./config');
const database = require('./database');
const ainedRoutes = require('./api/routes/ainedRoutes');
const kursusedRoutes = require('./api/routes/kursusedRoutes');
const oppejoudRoutes = require('./api/routes/oppejoudRoutes');
const ruumidRoutes = require('./api/routes/ruumidRoutes');


const app = express();
const { port } = config || 4000;

const logger = (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
};

// Middleware for creating req.body in express app
app.use(express.json());
// Routes
app.use('/ained', ainedRoutes);
app.use('/kursused', kursusedRoutes);
app.use('/oppejoud', oppejoudRoutes);
app.use('/ruumid', ruumidRoutes);
// Logger middleware
app.use(logger);


// Start listening
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});