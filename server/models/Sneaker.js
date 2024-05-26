const mongoose = require('mongoose');

const { Schema } = mongoose;

const sneakerSchema = new Schema({

    name: { type: String, required: true },
    sizes: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    images: [String],

}, { timestamps: true });

const SneakerModel = mongoose.model('Sneaker', sneakerSchema);

module.exports = { SneakerModel, sneakerSchema };