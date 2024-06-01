const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// connect to MongoDB
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.eydolch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(uri)
    .then(() => console.log('Connected to database!'))
    .catch(err => console.log(err));

// API operations
const apiPath = path.join(__dirname, 'api');
fs.readdirSync(apiPath).forEach(file => {
    require(`./api/${file}`)(app);
});