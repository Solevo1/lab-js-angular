const mongoose = require('mongoose');

const Game = mongoose.model('Game', {
    name: {
      type: String,
      required: true,
    },
    description: { 
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    }
});

module.exports = { Game };