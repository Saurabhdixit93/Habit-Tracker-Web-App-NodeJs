// requiring mongoose
const mongoose = require('mongoose');
// creating habbit schema
const habitSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    favourite: {
        type: Boolean,
        default: false
    },
    currentStatus: [{
        date: Date,
        state: String
    }]
},{
    timestamps: true
});

// exporting for global use
const Habit = mongoose.model('Habit',habitSchema);
module.exports = Habit;