const express = require('express');
const app = express();
const morgan = require('morgan')

const routeRoutes = require('./app/routes/route');

app.use(morgan('dev'));

app.use('/route',routeRoutes);

app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
});

module.exports = app;

