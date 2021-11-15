const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

exports.init = init;

function init(win) {
    autoUpdater.autoDownload = false;
    autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.on('checking-for-update', () => {
            
    });
    
    autoUpdater.on('update-not-available', ()=> {
        
    });
    
    autoUpdater.on('update-available', (info) => {
        let resp = dialog.showMessageBoxSync(win, {
            message: 'New update available. Do you want to download the bundle?',
            type: 'question',
            title: 'UPDATE NOTIFICATION',
            buttons: ['YES', 'NO']
        });

        if (resp == 0) {
            autoUpdater.downloadUpdate();
        }
    });
    
    autoUpdater.on('download-progress', (info) => {
        
    });

    autoUpdater.on('update-downloaded', () => {
        let resp = dialog.showMessageBoxSync(win, {
            message: 'New update downloaded. Do you want to quit the app now to update?',
            type: 'question',
            title: 'UPDATE NOTIFICATION',
            buttons: ['YES', 'NO']
        });

        if (resp == 0) {
            autoUpdater.quitAndInstall();
        }
    });

    autoUpdater.on('error', (error) => {
        console.log(`AUTO_UPDATE_ERROR: ${JSON.stringify(error)}`);
    });
}