const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required:'Full name can\'t be empty'
    },
    email: {
        type: String,
        required:'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required:'Password can\'t be empty',
        minlength: [5,'Password must be 5 caracther']
    },
    user_type: {
        type: String
    },
    saltSecret: String
    
});

//validacao de email
userSchema.path('email').validate((val) => {
    emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(val); // Assuming email has a text attribute
 }, 'Email not valid.')

//é executado antes de ser guardado
userSchema.pre('save', function (next){
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(this.password, salt, (err,hash) => {
            this.password = hash;
            this.saltSecret = salt;
            //executar o resto
            next();
        });

    });

});

//metodos
userSchema.methods.verifyPassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJwt = function(){
    return jwt.sign({_id:this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP        
    });
}

mongoose.model('User', userSchema);

