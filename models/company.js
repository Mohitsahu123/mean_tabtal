var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Company = new Schema(
    {   
        id:Number,
        name: String,
        subtitle: String,
        address: String,
        desc: String,
        website: String,
        industries: []
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Company', Company);