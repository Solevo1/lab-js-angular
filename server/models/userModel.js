const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
    },
    friends: Array,
    requests: Array,
    games: Array,
    password: { 
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = { User };
