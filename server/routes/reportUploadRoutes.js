// https://www.section.io/engineering-education/uploading-files-using-multer-nodejs/
// https://morioh.com/a/5c99be0fb5aa/how-to-upload-a-file-in-the-react-application-with-node-express-and-multer
const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const uuidv4 = require('uuid/v4')
const router = express.Router()

const DIR = './public/'

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

const multerFilter = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'application/pdf') {
            cb(null, true);
        }
        else {
            cb(null, false);
            return cb(new Error('Only .pdf format allowed!'));
        }
    }
});

// calling multer function
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

// API enpoint for uploading file
router.post('/api/uploadFile', upload.single('myFile'), async (req, res) => {
    try {
        const newFile = await File.create({
            name: req.file.fileName
        })
        res.status(200).json({
            status: 'success',
            nessage: 'File created successfully!'
        });
    } catch (error) {
        res.json({
            error
        });
    }
});
 
// API endpoint to render HTML file
router.use('/', (req, res) => {
    res.status(200).render('index');
});

// express server
module.exports = router
