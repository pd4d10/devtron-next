const { remote, BrowserWindow } = require('electron')

exports.install = () => {
  if (process.type === 'renderer') {
    console.log(`Installing Devtron from ${__dirname}`)
    if (remote.BrowserWindow.getDevToolsExtensions().devtron) return true
    return remote.BrowserWindow.addDevToolsExtension(__dirname)
  } else if (process.type === 'browser') {
    console.log(`Installing Devtron from ${__dirname}`)
    if (BrowserWindow.getDevToolsExtensions().devtron) return true
    return BrowserWindow.addDevToolsExtension(__dirname)
  } else {
    throw new Error('Devtron can only be installed from an Electron process.')
  }
}

exports.uninstall = () => {
  if (process.type === 'renderer') {
    console.log(`Uninstalling Devtron from ${__dirname}`)
    return remote.BrowserWindow.removeDevToolsExtension('devtron')
  } else if (process.type === 'browser') {
    console.log(`Uninstalling Devtron from ${__dirname}`)
    return BrowserWindow.removeDevToolsExtension('devtron')
  } else {
    throw new Error('Devtron can only be uninstalled from an Electron process.')
  }
}
