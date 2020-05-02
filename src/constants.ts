export const DEVTRON_CHANNEL = 'DEVTRON_CHANNEL'

export interface LintPayload {
  asar: boolean
  crash: boolean
  unresponsive: boolean
  uncaughtException: boolean
  currentVersion: string
  latestVersion: string
}

export interface LintMessage {
  type: 'lint'
  payload?: LintPayload
}

export type MessageContent = LintMessage
