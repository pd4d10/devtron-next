import React, { FC } from 'react'

export const Header: FC = ({ children }) => (
  <header className="toolbar toolbar-header">
    <div className="toolbar-actions">{children}</div>
  </header>
)
