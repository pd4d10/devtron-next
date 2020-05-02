import React, { FC, useState } from 'react'
import cx from 'classnames'
import { RequireGraphView } from './require-graph'
import { EventListenersView } from './event-listeners'
import { IpcView } from './ipc'
import { LintView } from './lint'
import { AccessibilityView } from './accessibility'
import { AboutView } from './about'
import { GlobalProvider } from './context'

const tabs = [
  {
    id: 'graph',
    name: 'Require Graph',
    component: RequireGraphView,
  },
  {
    id: 'events',
    name: 'Event Listeners',
    component: EventListenersView,
  },
  {
    id: 'ipc',
    name: 'IPC',
    component: IpcView,
  },
  {
    id: 'lint',
    name: 'Lint',
    component: LintView,
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    component: AccessibilityView,
  },
  {
    id: 'about',
    name: 'About',
    component: AboutView,
  },
]

export const App: FC = () => {
  const [active, setActive] = useState(0)
  const CurrentComponent = tabs[active].component

  return (
    <GlobalProvider>
      <div className="window">
        <div className="window-content">
          <div className="pane-group">
            <div className="pane pane-sm sidebar">
              <ul className="list-group">
                {tabs.map((tab, i) => (
                  <li
                    className={cx('list-group-item', { active: i === active })}
                    key={tab.name}
                    onClick={() => {
                      setActive(i)
                    }}
                  >
                    <div
                      className={cx('sidebar-icon', `sidebar-icon-${tab.id}`)}
                    />
                    {tab.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pane">
              <CurrentComponent />
            </div>
          </div>
        </div>
      </div>
    </GlobalProvider>
  )
}
