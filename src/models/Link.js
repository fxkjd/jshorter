const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    dest: { type: String, required: true },
    name: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v, cb) {
                Link.find({name: v}, function(err,docs){
                    cb(docs.length == 0);
                });
            },
            message: 'Link already exists!'
        }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    owner : { type: Schema.Types.ObjectId, ref: 'User' },
});

const Link = mongoose.model('Link', LinkSchema);

module.exports = Link;
