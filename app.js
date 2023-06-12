require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const jwtHelper = require('./config/jwtHelper');



const rtsIndex = require('./routes/index.router');
const rtsTrucks = require('./routes/vehicles');
const rtsShipment = require('./routes/outgoing');
var app = express();

//middle fucker ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(passport.initialize());
app.use('/api',rtsIndex);
app.use('/vehicles', jwtHelper.verifyJwtToken, rtsTrucks);
app.use('/outgoing', jwtHelper.verifyJwtToken, rtsShipment);


//error handler

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function(req, res, next) {
    let err = new Error('Not Found');
       err.status = 404;
       next(err);
   });
   // handle errors
app.use(function(err, req, res, next) {
    console.log(err);
    
     if(err.status === 404)
      res.status(404).json({message: "Not found"});
     else 
       res.status(500).json({message: "Something looks wrong :( !!!"});
});



app.use((err,req,res,next) => {
    if(err.name == 'ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});


//start fuck server
app.listen(process.env.PORT, () => console.log(`Server started at Port: ${process.env.PORT}`));

