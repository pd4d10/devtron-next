import React, { createContext, FC, useEffect, useState } from 'react'
import { MessageContent, LintPayload } from '../constants'

function noop() {}

export const GlobalContext = createContext<{
  lint?: LintPayload
  setLint: (v: LintPayload) => void
}>({
  setLint: noop,
})

export const GlobalProvider: FC = ({ children }) => {
  const [lint, setLint] = useState<LintPayload>()

  useEffect(() => {
    const listener = (message: MessageContent) => {
      switch (message.type) {
        case 'lint':
          console.log(message)
          setLint(message.payload)
          break
        default:
      }
    }

    const port = chrome.runtime.connect()
    port.onMessage.addListener(listener)

    port.postMessage({
      tabId: chrome.devtools.inspectedWindow.tabId,
    })

    return () => {
      port.onMessage.removeListener(listener)
      port.disconnect()
    }
  }, [])

  return (
    <GlobalContext.Provider
      value={{
        lint,
        setLint,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
