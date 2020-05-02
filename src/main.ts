import path from 'path'
import { ipcMain, BrowserWindow } from 'electron'
import fetch from 'node-fetch'
import { DEVTRON_CHANNEL, MessageContent, LintPayload } from './constants'

const extdir = path.resolve(__dirname, '..')

async function handleMessage(e: any, message: MessageContent) {
  console.log('message', message)
  // TODO:
  switch (message.type) {
    case 'lint': {
      let latestVersion = 'unknown'
      try {
        const res = await fetch(
          'https://atom.io/download/atom-shell/index.json'
        )
        const json = await res.json()
        latestVersion = json[0].version
      } catch (err) {}

      const wins = BrowserWindow.getAllWindows()

      const res: LintPayload = {
        asar: /[\\/]app\.asar[\\/]/.test(process.mainModule?.filename ?? ''),
        crash: wins.every((w) => w.listenerCount('crash') > 0),
        unresponsive: wins.every((w) => w.listenerCount('unresponsive') > 0),
        uncaughtException: process.listenerCount('uncaughtException') > 0,
        currentVersion: process.versions.electron,
        latestVersion,
      }
      return res
    }
  }
}

export function install() {
  console.log(`Installing Devtron from ${extdir}`)
  ipcMain.handle(DEVTRON_CHANNEL, handleMessage)
  if (!BrowserWindow.getDevToolsExtensions().devtron) {
    BrowserWindow.addDevToolsExtension(extdir)
  }
}

export function uninstall() {
  console.log(`Uninstalling Devtron from ${extdir}`)
  ipcMain.removeHandler(DEVTRON_CHANNEL)
  return BrowserWindow.removeDevToolsExtension('devtron')
}
