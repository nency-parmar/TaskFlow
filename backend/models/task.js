const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    status: {
        type: String,
        default: 'Pending'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});

const task = mongoose.model('task', taskSchema);

module.exports = task;