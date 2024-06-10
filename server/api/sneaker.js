const fs = require('fs');
const { uploadImage, deleteImage } = require('../aws-buckets/images');
const { SneakerModel } = require('../models/Sneaker');

const multer = require('multer');
const upload = multer();

module.exports = app => {
    // GET
    app.get('/sneaker', async (req, res) => {
        const { id: _id } = req.query;
        console.log('params: ', req.params);
        const query = { 
            ...(_id && {_id}), // _id: conditional prop 
         };
        SneakerModel.find(query)
            .then(result => {
                console.log('200: retrieved sneakers: ', result);
                res.send(result);
            })
            .catch(err => console.log('crud/sneaker - GET', err))
    });
    // POST
    app.post('/sneaker', upload.fields([
        { name: 'images[]', maxCount: 7 },
    ]), async (req, res) => {
        // console.log('Body', req.body);
        // console.log('Files', req.files);
        const { name, price, sizesStr, descBody, detailsBody } = req.body;

        const getFileKeys = async files => {
            var fKeys = [];
            for (let file of files) {
                let uploadRes;
                try {
                    uploadRes = await uploadImage(file);
                    console.log('uploadRes', uploadRes);
                    fKeys.push(uploadRes.key || '');
                }
                catch (err) {
                    console.log('crud/sneaker - POST: error uploading image');
                    fKeys.push(null);
                }
            }
            return fKeys;
        }

        const imgKeys = await getFileKeys(req.files['images[]']);

        console.log('imgKeys', imgKeys);

        // save to mongo
        new SneakerModel({ name, price: parseInt(price), sizesStr, descBody, detailsBody, imgKeys })
            .save()
            .then(result => {
                console.log('200: Created Sneaker');
                res.send(result);
            })
            .catch(err => console.log('crud/sneaker - POST (MONGODB)', err));
    });
}