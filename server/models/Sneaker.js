const mongoose = require('mongoose');

const { Schema } = mongoose;

const sneakerSchema = new Schema({

    name: { type: String, required: true },
    price: { type: Number, required: true },
    sizesStr: { type: String, required: true },
    descBody: { type: String, required: true },
    detailsBody: { type: String, required: true },
    imgKeys: [String],

}, { timestamps: true });

const SneakerModel = mongoose.model('Sneaker', sneakerSchema);

module.exports = { SneakerModel, sneakerSchema };