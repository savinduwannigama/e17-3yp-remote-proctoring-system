// main.js

// Modules to control application life and create native browser window
const { BrowserWindow, Menu, MenuItem, ipcMain, app } = require('electron')
const path = require('path')
const { download } = require("electron-dl");
const ipc = ipcMain
const { dialog } = require('electron')
const { google } = require('googleapis');
const fs = require('fs');



const CLIENT_ID = '1030032301297-iu6nhih0fg4p7temv1b653egltob6n6r.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//043IXKpbcf0dSCgYIARAAGAQSNwF-L9Irqozyp_l7TW8PMmmFejJwWk7GqNib5gHapWHBv-lJq5uqiAohfyckL3du1q51FvPT4YM';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client, });

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 480,
        minimizable: false,
        maximizable: false,
        resizable: false,
        movable: false,
        icon: "src/img/appicon3_YGz_icon.ico",

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            //devTools: true,
            devTools: false,
        }


    })
    mainWindow.setAlwaysOnTop(true, 'screen');

    app.commandLine.appendSwitch('allow-insecure-localhost');
    app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
        if (url === 'https://143.244.139.140/CO227-test#jitsi_meet_external_api_id=0&interfaceConfig.TILE_VIEW_MAX_COLUMNS=2&interfaceConfig.DISABLE_DOMINANT_SPEAKER_INDICATOR=true&interfaceConfig.startWithAudioMuted=false&interfaceConfig.startWithVideoMuted=false&userInfo.displayName=%22sasini%22&appData.localStorageContent=null') {
            // Verification logic.
            event.preventDefault()
            callback(true)
        } else {
            callback(false)
        }
    })
    mainWindow.on('close', function(e) {
        const choice = require('electron').dialog.showMessageBoxSync(this, {
            type: 'none',
            buttons: ['Yes', 'No'],
            noLink: true,
            title: 'Confirm',
            message: 'Are you sure you want to exit?',
            icon: 'src/img/appicon3_YGz_icon.ico'


        });
        if (choice === 1) {
            e.preventDefault();
        }
        app.quit;
    });

    ipcMain.on('timeOut', async() => {
        const confirm = await dialog.showMessageBox(mainWindow, {
            title: "",
            type: 'none',
            noLink: true,
            message: 'The session has timed out. Do you want log in again?',
            buttons: ["Log in", "Cancel"],
            icon: 'src/img/appicon3_YGz_icon.ico'
        })
        if (confirm.response === 0) {
            mainWindow.loadFile('src/loginpage.html')
        }
    })



    mainWindow.setMenu(null);
    // and load the index.html of the app.
    mainWindow.loadFile('src/loginpage.html')

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()

    ipc.on('Register', () => { mainWindow.loadFile('src/registerpage.html') })
    ipc.on('Login', () => { mainWindow.loadFile('src/loginpage.html') })

    ipc.on('home', () => { mainWindow.loadFile('src/home.html') })
    ipc.on('dashboard', () => { mainWindow.loadFile('src/dashboard.html') })
    ipc.on('course', () => { mainWindow.loadFile('src/courses.html') })
    ipc.on('schedule', () => { mainWindow.loadFile('src/schedule.html') })
    ipc.on('upload', () => { mainWindow.loadFile('src/upload.html') })
    ipc.on('settings', () => { mainWindow.loadFile('src/settings.html') })
    ipc.on('help', () => { mainWindow.loadFile('src/help.html') })
    ipc.on('exam room', () => { mainWindow.loadFile('src/examroom.html') })


    ipcMain.on("download", async(event, { url, fileName }) => {
        const win = BrowserWindow.getFocusedWindow();

        await download(win, url, {
            filename: fileName + '.mp4',
            directory: app.getAppPath() + '/src/recordedVideo',
            showBadge: true,
            overwrite: false,
            onCompleted: () => {
                event.reply('done')
            }
        }).then(dl => console.log(dl.getSavePath()))



    });

    ipc.on("googleDriveUpload", async(event, { fileName, drivePath }) => {
        console.log(fileName, drivePath)
        uploadFile(event, fileName, drivePath.split('/folders/')[1])
    })




    const menu = new Menu()
    menu.append(new MenuItem({ label: 'CO321 Quize is postponded' }));
    menu.append(new MenuItem({ type: 'separator' }));
    menu.append(new MenuItem({ label: 'Please fill folowing form' }))

    app.on('browser-window-created', (event, win) => {
        win.webContents.on('context-menu', (e, params) => {
            menu.popup(win, params.x, params.y)
        })
    })

    ipcMain.on('show-context-menu', (event) => {
        const win = BrowserWindow.fromWebContents(event.sender)
        menu.popup(win)
    })


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })


})



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.



async function uploadFile(event, file, folderpath) {
    try {
        const filePath = path.join(__dirname, 'src/recordedVideo/' + file);
        const response = await drive.files.create({
            media: {
                mimeType: 'application/octet-stream',
                body: fs.createReadStream(filePath),
                resumable: true,
            },
            resource: {
                'name': file,
                parents: [folderpath]
            },
            fields: 'id'

        });


        console.log(response.data);
        event.reply('done', {
            errormsg: 'noError',
        })
    } catch (error) {
        event.reply('done', {
            errormsg: error.message,
        })
    }
}