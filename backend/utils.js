const multer = require("multer");
// const gcsStorage = require("multer-gcs");
const fs = require("fs");
const path = require("path");
const Mustache = require("mustache");
const nodemailer = require("nodemailer");
// For Uploading a files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(file.mimetype.startsWith("image")){
            fs.exists("uploads/images/" + req.headers.user_id + "/", (exists) => {
                if(!exists){
                    fs.mkdir("uploads/images/" + req.headers.user_id + "/", (err) => {
                        fs.exists("uploads/images/" + req.headers.user_id + "/", (exists) => {
                            if(!exists){
                                cb(null, "uploads/images/" + req.headers.user_id + "/")
                            }else{
                                cb(new Error("While making directory"), "uploads/images/" + req.headers.user_id + "/");                    
                            }
                        });
                    })
                }else{
                    cb(null, "uploads/images/" + req.headers.user_id + "/")
                }
            })
        }else{
            cb(new Error("file type mismatch"), "uploads/");
        }
    },

    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname)
    }    
});


// const gcs = gcsStorage({
//     bucket: 'thesmartstore-29c86.appspot.com', // Required : bucket name to upload
//     projectId: 'thesmartstore-29c86', // Required : Google project ID
//     keyFilename: '/code/thesmartstore-29c86-firebase-adminsdk-g1e7d-9cb0b3f6a1.json', // Optional : JSON credentials file for Google Cloud Storage
//     destination: (req, file, cb) => {
//         cb(null, "uploads/images/" + req.headers.user_id + "/" + req.params.id)
//     }, // Optional : destination folder to store your file on Google Cloud Storage, default: ''
//     acl: 'publicRead' // Optional : acl credentials file for Google Cloud Storage, 'publicrRead' or 'private', default: 'private'
// });

exports.upload = multer({
    storage: storage, 
    fileFilter: (req, file, cb)=>{
        if(file.mimetype.startsWith("image")){
            cb(null, true);
        }else{
            cb(new Error("file type mismatch"), false);
        }
    }
});

exports.mail = (to, subject, text, html) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "lazyengineer92@gmail.com", // generated ethereal user
            pass: "wjmxelvdbwgjrfqx" // generated ethereal password
        }
    });
    

    return transporter.sendMail({
        from: '"The Smart Store PK" <no-reply@thesmartstore.pk>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html // html body
    });
};

exports.template = function(filename, view, fn){
    fs.readFile(path.join(__dirname,"..","template", filename + ".mst"), (err, data) => {
        fn(Mustache.render(data.toString(), view))
    });
}
