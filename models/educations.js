    var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require ('passport-local-mongoose');



var educations = new Schema(
                        {   
                            id : Number,
                            college: String,
                            status: String,
                            course: String,
                            dateFrom: String,
                            dateTo: String,
                            user_id: Number
                        }, {
        timestamps: true
    });

module.exports = mongoose.model('Educations', educations);

