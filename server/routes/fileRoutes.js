const express = require('express');
const multer = require('multer');
const { uploadToDrive, auth } = require('./driveUploader'); // 修改此行来导入auth
const FileModel = require('../models/fileModel');
const { google } = require('googleapis');

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

// 使用导入的auth对象
async function shareFile(fileId) {
    const drive = google.drive({ version: 'v3', auth: auth }); 
    const permissions = {
        role: 'reader',
        type: 'user',
        emailAddress: 'attackflow15@gmail.com'
    };
    try {
        await drive.permissions.create({
            resource: permissions,
            fileId: fileId,
            fields: 'id',
        });
        console.log('File shared successfully with attackflow15@gmail.com');
    } catch (error) {
        console.error('Error sharing the file:', error);
    }
}

router.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).send('No file uploaded');
    }

    console.log('File details:', req.file);

    try {
        const uploadedFile = await uploadToDrive(req.file.originalname, req.file.buffer, req.file.mimetype);
        console.log('Uploaded File Details from Google Drive:', uploadedFile);

        if (!uploadedFile || !uploadedFile.id || !uploadedFile.webContentLink) {
            console.error("Failed to get necessary details from the uploaded file.");
            return res.status(500).json({ message: 'Error uploading file to Drive.' });
        }

        // 在上传文件成功后立刻共享文件
        await shareFile(uploadedFile.id);

        const newFile = new FileModel({
            driveId: uploadedFile.id,
            name: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            uploadedBy: req.user ? req.user.id : null, 
            pathInDrive: uploadedFile.webContentLink, 
            filename: req.file.originalname
        });

        await newFile.save();

        console.log('File uploaded successfully with ID:', uploadedFile.id);
        res.status(200).json({ message: 'File uploaded successfully!', driveId: uploadedFile.id });

    } catch (error) {
        console.error('Error encountered during file upload:', error);
        res.status(500).json({ message: 'Error uploading file.', error: error.message });
    }
});

module.exports = router;
