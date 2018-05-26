    var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require ('passport-local-mongoose');



var User = new Schema(
    {   
        id : Number,
        firstName: String,
        lastName: String,
        username: {
            type: String,
            unique: true
        },
        currentRole: String,
        location: String,
        imageUrl: {
            type: String,
            default: '../images/avatar.jpg'
        }
    },
    {
        timestamps: true
    }
);


User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);