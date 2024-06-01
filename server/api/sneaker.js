const fs = require('fs');
const { uploadImage, deleteImage } = require('../aws-buckets/images');
const { SneakerModel } = require('../models/Sneaker');

module.exports = app => {
    // GET
    app.get('/sneaker', async (req, res) => {
        const { id: _id } = req.params;

        const query = { _id };
        SneakerModel.findOne(query)
            .exec((err, result) => {
                if(err){
                    console.log('crud/sneaker - GET', err);
                    return;
                }
                console.log('200: retrieved sneaker with id: ', id);
                res.send(result);
            });
    });
    // POST
    app.post('/sneaker', async (req, res) => {
        const { name, sizesStr, descBody, detailsBody } = req.body;

        const imgKeys = req.files['images[]'].map(async (file) => {
            let uploadRes;
            try {
                uploadRes = await uploadImage(file);
            }
            catch (err) {
                console.log('crud/sneaker - POST:', err);
            }
            return uploadRes.key || '';
        });

        // save to mongo
        new SneakerModel({ name, sizesStr, descBody, detailsBody, imgKeys })
            .save()
            .then(result => {
                console.log('200: Created Sneaker');
                res.send(result);
            })
            .catch(err => console.log('crud/sneaker - POST', err));
    });
}