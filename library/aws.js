const AWS = require("aws-sdk");
const multer = require('multer');
const multerS3 = require('multer-s3');
const sha256Hash = require("js-sha256");
const { aws } = require("../config/app");

const s3 = new AWS.S3({
    accessKeyId: aws.access_key,
    secretAccessKey: aws.secret_key
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const storageS3 = (options = {folder: "media"}) => {
    return multerS3({
        s3: s3,
        bucket: "mbq-bucket",
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            cb(null, `${aws.folder}/${options.folder}/${sha256Hash.sha256(`${file.originalname}-${Date.now()}`)}`);
        }
    })
}



exports.upload = (options) => {
    return multer({
        storage: storageS3(options),
        fileFilter: fileFilter
    })
}

exports.remove = (key) => {
    return s3.deleteObject({Bucket: "mbq-bucket", Key: key}).promise()
}