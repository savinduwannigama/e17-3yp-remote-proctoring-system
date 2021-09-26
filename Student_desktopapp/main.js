// main.js

// Modules to control application life and create native browser window
const {
    BrowserWindow,
    Menu,
    MenuItem,
    ipcMain,
    app
} = require('electron')
const path = require('path')
const { download } = require("electron-dl");
const ipc = ipcMain

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 480,
        minimizable: false,
        maximizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        }


    })

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
        /*const choice = require('electron').dialog.showMessageBoxSync(this, {
            type: 'question',
            buttons: ['Yes', 'No'],
            noLink: true,
            title: 'Confirm',
            message: 'Are you sure you want to exit?'
        });
        if (choice === 1) {
            e.preventDefault();
        }*/
        app.quit;
    });


    mainWindow.setMenu(null)
        // and load the index.html of the app.
    mainWindow.loadFile('src/loginpage.html')

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    ipc.on('Register', () => { mainWindow.loadFile('src/registerpage.html') })
    ipc.on('Login', () => { mainWindow.loadFile('src/loginpage.html') })
    ipc.on('Authentication', () => { mainWindow.loadFile('src/authentication.html') })
    ipc.on('verify', () => { mainWindow.loadFile('src/loginpage.html') })

    ipc.on('home', () => { mainWindow.loadFile('src/home.html') })
    ipc.on('dashboard', () => { mainWindow.loadFile('src/dashboard.html') })
    ipc.on('course', () => { mainWindow.loadFile('src/courses.html') })
    ipc.on('schedule', () => { mainWindow.loadFile('src/schedule.html') })
    ipc.on('notification', () => { mainWindow.loadFile('src/notifications.html') })
    ipc.on('settings', () => { mainWindow.loadFile('src/settings.html') })
    ipc.on('help', () => { mainWindow.loadFile('src/videoRecording.html') })


    ipcMain.on("download", async(event, { url }) => {
        var time = new Date()
        const win = BrowserWindow.getFocusedWindow();
        console.log(await download(win, url, {
            filename: time + '.mp4'
        }));
    });


    const menu = new Menu()
    menu.append(new MenuItem({ label: 'CO321 Quize is postponded' }))
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: 'Please fill foloowing form' }))

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