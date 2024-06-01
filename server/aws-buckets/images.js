const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
require('dotenv').config();

const bucket = {
    name: process.env.AWS_IMAGE_BUCKET_NAME,
    instance: new S3({
        region: process.env.AWS_IMAGE_BUCKET_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }),
}

export function uploadImage(file) {
    const fileStream = fs.createReadStream(file.path);
    const params = {
        Bucket: bucket.name,
        Body: fileStream,
        Key: file.filename,
    }
    return bucket.instance.upload(params).promise();
}

export function deleteImage(fileKey) {
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