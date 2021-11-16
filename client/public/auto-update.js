const { dialog } = require('electron');
const { autoUpdater } = require('electron-updater');

const isUpdateDownloaded = false;
exports.modules = {
    init: init,
    checkUpdateDownloaded: checkUpdateDownloaded,
    triggerUpdate: triggerUpdate
}

function init(win) {
    autoUpdater.autoDownload = false;
    autoUpdater.checkForUpdatesAndNotify();
    autoUpdater.on('checking-for-update', () => {
            
    });
    
    autoUpdater.on('update-not-available', ()=> {
        
    });
    
    autoUpdater.on('update-available', (info) => {
        let resp = dialog.showMessageBoxSync(win, {
            message: `A new version is available(version ${info.version}). Download it now?`,
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
            message: 'New version downloaded. Update now?',
            type: 'question',
            title: 'UPDATE NOTIFICATION',
            buttons: ['YES', 'NO']
        });

        if (resp == 0) {
            autoUpdater.quitAndInstall();
        } else {
            isUpdateDownloaded = true;
        }
    });

    autoUpdater.on('error', (error) => {
        console.log(`AUTO_UPDATE_ERROR: ${JSON.stringify(error)}`);
    });
}

function checkUpdateDownloaded() {
    return isUpdateDownloaded;
}

function triggerUpdate() {
    autoUpdater.quitAndInstall(true, false);
}