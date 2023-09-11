const { google } = require('googleapis');
const serviceAccount = require('../serviceAccountKey.json');
const { Readable } = require('stream');

const CLIENT_ID = serviceAccount.client_id;
const CLIENT_EMAIL = serviceAccount.client_email;
const PRIVATE_KEY = serviceAccount.private_key;

const SCOPES = ['https://www.googleapis.com/auth/drive'];

const auth = new google.auth.JWT(
    CLIENT_EMAIL,
    null,
    PRIVATE_KEY,
    SCOPES,
    null
);

const drive = google.drive({ version: 'v3', auth });

const uploadToDrive = async (fileName, fileBuffer, mimeType = 'application/pdf') => {
    try {
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: mimeType
            },
            media: {
                mimeType: mimeType,
                body: bufferStream
            }
        });

        if (response.data && response.data.id) {
            // 此处新添加，为文件添加共享权限
            await drive.permissions.create({
                fileId: response.data.id,
                requestBody: {
                    role: 'reader',
                    type: 'user',
                    emailAddress: 'attackflow15@gmail.com'
                }
            });
            return response.data;
        } else {
            throw new Error('Failed to upload the file.');
        }
    } catch (error) {
        // 输出完整的错误信息
        console.error('Error uploading file:', error);
        throw new Error(`Error uploading file: ${error.message}`);
    }
}

module.exports = { uploadToDrive, auth }; // 导出 auth 对象供其他文件使用
