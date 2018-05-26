    var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require ('passport-local-mongoose');


var skills = new Schema(
                        {   
                            id : Number,
                            name: String,
                            user_id: Number
                        }, {
        timestamps: true
    });


module.exports = mongoose.model('Skills', skills);
