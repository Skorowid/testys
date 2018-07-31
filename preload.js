// Preload script
const { webFrame } = require('electron')
// Handle Session Permission RFRC
const { session } = require('electron')

session
    .fromPartition('some-partition')
    .setPermissionRequestHandler((webContents, permission, callback) => {
        const url = webContents.getURL()

        if (permission === 'notifications') {
            // Approves the permissions request
            callback(true)
        }

        if (!url.startsWith('https://my-website.com')) {
            // Denies the permissions request
            return callback(false)
        }
    })
        .defaultSession.webRequest.onHeadersReceived((details, callback) => {
            callback({responseHeaders: `default-src 'none'`})
    })




// Set a variable in the page before it loads
webFrame.executeJavaScript('window.foo = "foo";')

// The loaded page will not be able to access this, it is only available
// in this context
window.bar = 'bar'

document.addEventListener('DOMContentLoaded', () => {
    // Will log out 'undefined' since window.foo is only available in the main
    // context
    console.log(window.foo)

    // Will log out 'bar' since window.bar is available in this context
    console.log(window.bar)
})

window.eval = global.eval = function () {
    throw new Error(`Sorry, this app does not support window.eval().`)
}
window.eval = function () {
    throw new Error(`Sorry, this app does not support window.eval().`)
}
const { readFileSync } = require('fs')
const { remote } = require('electron');
const { Menu, BrowserWindow, MenuItem, shell } = remote;
const { fs } = require('fs')
window.readDir = null;
//what's going on here?

window.readConfig = function () {
    const data = readFileSync('./config.json')
    return data
}
webFrame.executeJavaScript('window.data = ' + window.readConfig() + ';');// SUCESFUL REEED FILE FROM OTHER SIDE!


