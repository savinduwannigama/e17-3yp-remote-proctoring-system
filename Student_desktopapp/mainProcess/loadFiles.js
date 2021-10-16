const { ipcMain, dialog, BrowserWindow } = require('electron')

ipcMain.on('open', (event) => {
    const options = {
        type: 'warning',
        title: 'Information',
        message: "This is an information dialog. Isn't it nice?",
        buttons: ['Yes', 'No']
    }
    dialog.showMessageBoxSync(new BrowserWindow({
        show: false,
        alwaysOnTop: true
    }), options, (index) => {
        console.log(index)
    })
})