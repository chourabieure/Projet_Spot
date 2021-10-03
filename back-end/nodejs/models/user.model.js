const mongoose = require('mongoose');

// Describing the model of User
const User = mongoose.model('User', {
    ip_adress: String,
});

module.exports = User