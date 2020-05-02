import { DEVTRON_CHANNEL, MessageContent } from '../constants'

export function sendMessage(message: MessageContent) {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(message)
    const evalString = `require('electron').ipcRenderer.invoke(${DEVTRON_CHANNEL}, ${json})`
    chrome.devtools.inspectedWindow.eval(
      evalString,
      (result, exceptionInfo) => {
        if (exceptionInfo) {
          reject(exceptionInfo)
        } else {
          resolve(result)
        }
      }
    )
  })
}
