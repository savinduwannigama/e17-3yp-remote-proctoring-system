/* 
Google Drive API:
Demonstration to:
1. upload 
2. delete 
3. create public URL of a file.
required npm package: googleapis
*/
const { google } = require('googleapis');
const path = require('path');
//const fs = require('fs');

const CLIENT_ID = '541047315053-7bibru42slsvqs7pbg6gjg0o5udemasb.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04tZJFIBNTtPVCgYIARAAGAQSNwF-L9IrHhA9F1EffRHqqeRjErHm3WBoNjfpuYEG1Wkm0UdSLEowNhzl6vMOkAZqxWQfeGvtc-E';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/


async function uploadFile(file) {
    // try {
    var filePath = path.join(__dirname, 'recordedVideo/' + file);
    const response = await drive.files.create({
        // requestBody: {
        //     name: 'example3.jpg', //This can be name of your choice
        //     mimeType: 'image/jpg',
        // },
        media: {
            mimeType: 'application/octet-stream',
            body: fs.createReadStream(filePath),
        },
        resource: {
            'name': file,
            parents: ['1FXjMPKqJgJ88-UmKqgeLhd_8DyjeQ9nX']
        },
        fields: 'id'

    }, function(err, file) {
        if (err) {
            // Handle error
            console.error(err);
        } else {
            console.log('File Id: ', file.id);
            closePopup();
        }
    });

    //console.log(response.data);

    // } catch (error) {
    //     console.log(error.message);
    // }
}

async function deleteFile() {
    try {
        const response = await drive.files.delete({
            fileId: 'YOUR FILE ID',
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);
    }
}

// deleteFile();

async function generatePublicUrl() {
    try {
        const fileId = 'YOUR FILE ID';
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        /* 
        webViewLink: View the file in browser
        webContentLink: Direct download link 
        */
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
        console.log(result.data);
    } catch (error) {
        console.log(error.message);
    }
}

// generatePublicUrl();