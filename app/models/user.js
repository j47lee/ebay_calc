var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//SCHEMA FOR USER MODEL
var userSchema = mongoose.Schema({

        email        : String,
        password     : String,
        list         : [
          { item : String,
            amount : Number,
            retailer : String,
            fee : Number,
            net : Number
          }
        ]

});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and export it to be used elsewhere
module.exports = mongoose.model('User', userSchema);
