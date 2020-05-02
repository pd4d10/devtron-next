import { ipcMain, BrowserWindow } from 'electron'
import { DEVTRON_CHANNEL, MessageContent } from './constants'

export function install() {
  console.log(`Installing Devtron from ${__dirname}`)
  ipcMain.handle(DEVTRON_CHANNEL, (e, message: MessageContent) => {
    console.log(message)
    // TODO:
    switch (message.type) {
    }
  })
  if (!BrowserWindow.getDevToolsExtensions().devtron) {
    BrowserWindow.addDevToolsExtension(__dirname)
  }
}

export function uninstall() {
  console.log(`Uninstalling Devtron from ${__dirname}`)
  ipcMain.removeHandler(DEVTRON_CHANNEL)
  return BrowserWindow.removeDevToolsExtension('devtron')
}
