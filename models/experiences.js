    var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require ('passport-local-mongoose');


var experiences = new Schema(
                        {   
                            id : Number,
                            jobTitle: String,
                            companyName: String,
                            location: String,
                            desc: String,
                            dateFrom: String,
                            dateTo: String,
                            linkedTo: String,
                            user_id: Number,
                            selectedCompany: {}
                        }, {
        timestamps: true
    });


module.exports = mongoose.model('Experiences', experiences);
