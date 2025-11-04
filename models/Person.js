const mongoose = require('mongoose');
const {Schema } = mongoose;
const userSchema = new Schema({
    Name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    Profession:{
        enum: ['developer', 'tester', 'sales mg'],
        required: true
    }
});

const Person = mongoose.model('Person', userSchema);
module.exports= Person;