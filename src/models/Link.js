const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Link = new Schema({
    dest: String,
    name: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    owner : { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Link', Link);
