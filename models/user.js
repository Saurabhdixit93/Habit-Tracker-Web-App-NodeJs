
// requiring mongoose
const mongoose = require('mongoose');
// creating user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    habits: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Habit'
    }]
},
    {
        timestamps: true
});

//exporting user schema for global uses
const User = mongoose.model('User', userSchema);

module.exports = User;