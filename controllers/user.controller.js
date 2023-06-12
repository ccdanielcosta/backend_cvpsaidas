const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');
const _ = require('lodash');

module.exports.register = (req,res,next) => {
var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.user_type = req.body.user_type;
    user.save((err, doc) => {
        //envia 
        if(!err)
            res.send(doc);
        else {
            if(err.code == 11000)
                res.status(422).send(['Duplicate email']);   
            else         
                return next(err);         
        }    
    });
}


module.exports.authenticate = (req,res,next) => {
    //chama o passport
    passport.authenticate('local',(err,user,info) => {
        //erro do passport middleware
        if(err) return res.status(400).json(err);
        //utilizador regitado
        else if(user) return res.status(200).json({"token": user.generateJwt() });
        //user desconhecido
        else return res.status(404).json(info);

    })(req,res);
}

module.exports.userProfile = (req, res, next) => {
    User.findOne({_id: req._id},
        (err, user) => {
            if(!user)
                return res.status(404).json({status: false, message:'User record not found'});
            else
                return res.status(200).json({status: true, user: _.pick(user,['fullName','email','_id','user_type'])});

        }
        )
}

module.exports.getDrivers = (req, res, next) => {



    User.find({user_type: "driver"}, function(err, drivers){
        if (err) {
         next(err);
        } else {
         res.json({
                 total: drivers.length,
                 results: drivers
            });
        }
       });

    //   // drivers: {
    //     total: users.length,
    //     results: users
    //   }});



    // User.find({user_type:  req.params.user_type},
    // (err, user) => {
    //     console.log(user)
    //   })


    //  User.find({user_type: req.user_type}.toArray(), 
    //     (err, user) => {
    //         if (err) {
    //         next(err);
    //         } else {

    //             res.json(user);
    //        // res.json({status:"success", message: "Users found!!!", data:{users: user}});
    //         }
    //  });
} 
