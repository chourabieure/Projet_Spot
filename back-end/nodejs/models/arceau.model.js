const mongoose = require('mongoose');

// Describing the model of Arceau
const Arceau = mongoose.model('Arceau', {
    index: Number,
    geo_x: String,
    geo_y: String,
    nombre: Number,
});

module.exports = Arceau