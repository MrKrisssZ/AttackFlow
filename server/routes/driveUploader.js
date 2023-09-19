const { google } = require('googleapis');
const serviceAccount = require('../serviceAccountKey.json');
const { Readable } = require('stream');

// Google client details
const CLIENT_ID = serviceAccount.client_id;
const CLIENT_EMAIL = serviceAccount.client_email;
const PRIVATE_KEY = serviceAccount.private_key;

// Define necessary Google Drive scopes
const SCOPES = ['https://www.googleapis.com/auth/drive'];

// Authenticate using the service account
const auth = new google.auth.JWT(
    CLIENT_EMAIL,
    null,
    PRIVATE_KEY,
    SCOPES,
    null
);

// Initialize Google Drive API
const drive = google.drive({ version: 'v3', auth });

// Define the upload function
const uploadToDrive = async (fileName, fileBuffer, mimeType = 'application/pdf') => {
    try {
        // Create buffer stream from file buffer
        const bufferStream = new Readable();
        bufferStream.push(fileBuffer);
        bufferStream.push(null);

        // Folder ID target for the upload
        const folderId = '1NNIzWvBy0xS9-00jImN24KsYcU2KeSX9';

        // Start the upload process
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

        // Check if the upload was successful
        if (response.data && response.data.id) {
            // If successful, grant read permissions for the uploaded file to a specific email
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
            // Handle failed upload
            throw new Error('Failed to upload the file.');
        }
    } catch (error) {
        // Error logging and propagation
        console.error('Error uploading file:', error);
        throw new Error(`Error uploading file: ${error.message}`);
    }
}

// Export necessary modules
module.exports = { uploadToDrive, auth };
