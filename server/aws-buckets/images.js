const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const { Duplex } = require('stream');
require('dotenv').config();

const bucket = {
    name: process.env.AWS_IMAGES_BUCKET_NAME,
    instance: new S3({
        region: process.env.AWS_IMAGES_BUCKET_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }),
}

function bufferToStream(myBuffer) {
    let tmp = new Duplex();
    tmp.push(myBuffer);
    tmp.push(null);
    return tmp;
}
function genRandFileKey(){
    return [...new Array(32)].map((_, i) => Math.floor(Math.random() * 16).toString(36)).join('');
}

function _upload(file) {
    // console.log('file:', file);
    const readableStream = bufferToStream(file.buffer);
    const randFileKey = genRandFileKey();
    const params = {
        Bucket: bucket.name,
        Body: readableStream,
        Key: randFileKey,
    }
    // console.log('aws params: ', params);
    return bucket.instance.upload(params).promise();
}

function _delete(fileKey) {
    const params = {
        Bucket: bucket.name,
        Key: fileKey,
    }
    bucket.instance.deleteObject(params, (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    });
}

module.exports = {
    uploadImage: _upload,
    deleteImage: _delete,
}