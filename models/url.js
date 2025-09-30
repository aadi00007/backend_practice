const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');
const urlschema  = mongoose.Schema({
    shortID:{
        type: String,
        required: true,
        unique: true,

    },
    redirectUrl:{
        type: String,
        required: true,
    },
    visitHistory:[{
        timeStamp: {type: Number}
    }],
    clicks: {
    type: Number,
    default: 0
  }
},
{timestamps: true});
module.exports = mongoose.model('URL', urlschema);
