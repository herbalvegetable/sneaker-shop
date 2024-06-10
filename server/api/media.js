const { getImage } = require('../aws-buckets/images');

module.exports = app => {
    // GET
    app.get('/media/:fileKey', (req, res) => {
        const { fileKey } = req.params;
        try{
            const readStream = getImage(fileKey);
            readStream.pipe(res);
        }
        catch(err){
            console.log(err);
        }
    });
}