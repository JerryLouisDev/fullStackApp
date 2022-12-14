'use strict';

// import statement
const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const cors = require('cors');


// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


(async () =>{
  try{
    await sequelize.authenticate();
    console.log('Connection to the database was successful!');
    await sequelize.sync();
    // this prop deletes all the users{force : true}
    console.log('model sync sucessful');
  }
  catch(error){
    console.error('database connection failed', error);
  }
})();

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);


// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 9000);


// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
