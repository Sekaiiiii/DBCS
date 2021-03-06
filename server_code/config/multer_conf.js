'use strict'
const multer = require("multer");

module.exports = {
    web: {
        image: {
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, 'uploads/');
                },
                filename: function (req, file, cb) {
                    cb(null, 'image' + '-' + Date.now());
                }
            }),
            fileFilter: function (req, file, cb) {
                if (file.mimetype != "image/gif" &&
                    file.mimetype != "image/png" &&
                    file.mimetype != "image/jpeg") {
                    return cb(new Error("upload file mimetype error"), false);
                }
                return cb(null, true);
            }
        }
    },
    android: {
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, 'uploads/');
            },
            filename: function (req, file, cb) {
                cb(null, 'explain' + '-' + Date.now() + '.mp3');
            }
        }),
        fileFilter: function (req, file, cb) {
            if (file.mimetype != "audio/mpeg") {
                return cb(new Error("upload file mimetype error"), false);
            }
            return cb(null, true);
        },
        limits: {
            files: 1
        }
    }
};