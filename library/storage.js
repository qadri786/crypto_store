const AWS = require("aws-sdk");
const multer = require('multer');
const multerS3 = require('multer-s3');
const sha256Hash = require("js-sha256");
const { storage } = require("../config/app");

const s3 = new AWS.S3({
    accessKeyId: "",
    secretAccessKey: ""
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}


const disks = {
    storageS3: (options = {folder: "media"}) => {
        return multerS3({
            s3: s3,
            bucket: "mbq-bucket",
            acl: "public-read",
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: (req, file, cb) => {
                cb(null, `${aws.folder}/${options.folder}/${sha256Hash.sha256(`${file.originalname}-${Date.now()}`)}`);
            }
        })
    },
    local: (options = {folder: "media"}) => {
        return multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, `${__dirname}/../server/uploads/${options.folder}/`)
            },
            filename: function (req, file, cb) {
              cb(null, `${sha256Hash.sha256(`${file.originalname}-${Date.now()}`)}`)
            }
        })
    }
}

exports.upload = (options) => {
    return multer({
        storage: disks[storage.disk](options),
        fileFilter: fileFilter
    })
}

exports.remove = (key) => {
    return s3.deleteObject({Bucket: "", Key: key}).promise()
}