    var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var counterSchema = {
    _id: { type: String, required: true },
    seq: { type: Number, required: true }
};




var counterObj = mongoose.model("counters", counterSchema);

 module.exports.getNextSequence = function(collection,callback){
        counterObj.findOneAndUpdate({ _id: collection }, { $inc: { seq: 1 } }, {new: true, upsert: true}, function (err, docs) {
            if (err) throw err;
            callback(err, docs)
        });
    };
