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

        // Folder ID where you want to upload the file
        const folderId = '1NNIzWvBy0xS9-00jImN24KsYcU2KeSX9';

        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: mimeType,
                parents: [folderId] // Ensure the file is uploaded to the specified folder
            },
            media: {
                mimeType: mimeType,
                body: bufferStream
            }
        });

        if (response.data && response.data.id) {
            // Grant read permissions for the uploaded file to a specific email
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
        console.error('Error uploading file:', error);
        throw new Error(`Error uploading file: ${error.message}`);
    }
}

module.exports = { uploadToDrive, auth };
