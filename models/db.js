const mongoose = require('mongoose');

//mongoose.connect('mongodb://user:password@sample.com:port/dbname', { useNewUrlParser: true })

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true}, (err) => {

    if(!err) {console.log('MongoDB connection succeedeed!');}
    else{console.log('Error in MongoDB connection:' + JSON.stringify(err,undefined,2)); }

});

require('./user.model');